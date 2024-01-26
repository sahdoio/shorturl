import { faker } from '@faker-js/faker'
import { Application } from '../../../app'
import { FieldValidator } from '../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'
import { ListTasks } from '../../../app/data/useCases/task/list-tasks'
import { TaskEntity } from '../../../app/domain/entities/Task'
import { CreateTaskDto } from '../../../app/domain/useCases/task/create-task'
import { ListTasksUc } from '../../../app/domain/useCases/task/list-tasks'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import { Log } from '../../../app/implementations/helpers/log'
import { PersonalFieldValidator } from '../../../app/implementations/helpers/validate-fields'
import { I18n } from '../../../app/implementations/internationalization/i18n'
import { DbCreateTaskRepository } from '../../../app/implementations/repositories/task/db-create-task-repository'
import { DbFindTaskRepository } from '../../../app/implementations/repositories/task/db-find-task-repository'
import { ListTasksController } from '../../../app/presentation/controllers/task/list-tasks'
import { HttpRequest } from '../../../app/presentation/protocols/http'
import Config from '../../../config/config'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'

interface SutTypes {
  sut: ListTasksController
  data: HttpRequest
  uc: ListTasksUc
  i18n: Internationalization
  personalValidator: FieldValidator
  createdTask: TaskEntity
}

const makeSut = async (): Promise<SutTypes> => {
  new Application(true)
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)
  const findTaskRepository = new DbFindTaskRepository(dbORM)
  const createTaskRepository = new DbCreateTaskRepository(dbORM)
  const uc = new ListTasks(i18n, findTaskRepository)
  const personalValidator = new PersonalFieldValidator()
  const log = new Log
  const sut = new ListTasksController(personalValidator, log, uc)
  const taskData: CreateTaskDto = {
    name: 'Task ' + faker.word.adjective(5),
    description: faker.lorem.lines(3),
    statusId: Config.TASK_STATUS.TO_DO
  }
  const data = makeHttpRequestMock({
    body: {
      ...taskData
    },
    query: {
      itemsPerPage: 10,
      currentPage: 1,
      orderBy: 'createdAt',
      isOrderByDesc: true
    }
  })
  const createdTask = await createTaskRepository.exec(taskData)
  return {
    sut,
    data,
    i18n,
    uc,
    personalValidator,
    createdTask
  }
}

describe('ListTaskController Integration', () => {
  test('Should return Ok if tasks were retrieved successfully', async () => {
    const { sut, data, i18n, createdTask } = await makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('FIND_TASK_SUCCESSFUL'))
    const resultIds = res.body.data.payload.map(item => item.id)
    expect(resultIds).toContainEqual(createdTask.id)
  })

  test('Should return 500 if task creation was executed with server error', async () => {
    const { sut, uc, data } = await makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
