import { faker } from '@faker-js/faker'
import { Application } from '../../../app'
import { FieldValidator } from '../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'
import { DeleteTask } from '../../../app/data/useCases/task/delete-task'
import { TaskEntity } from '../../../app/domain/entities/Link'
import { CreateTaskDto } from '../../../app/domain/useCases/task/create-task'
import { DeleteTaskUc } from '../../../app/domain/useCases/task/delete-task'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import { Log } from '../../../app/implementations/helpers/log'
import { PersonalFieldValidator } from '../../../app/implementations/helpers/validate-fields'
import { I18n } from '../../../app/implementations/internationalization/i18n'
import { DbCreateLinkRepository } from '../../../app/implementations/repositories/links/db-create-link-repository'
import { DbDeleteTaskRepository } from '../../../app/implementations/repositories/links/db-delete-task-repository'
import { DbFindTaskRepository } from '../../../app/implementations/repositories/links/db-find-task-repository'
import { DeleteTaskController } from '../../../app/presentation/controllers/task/delete-task'
import { HttpRequest } from '../../../app/presentation/protocols/http'
import Config from '../../../config/config'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'

interface SutTypes {
  sut: DeleteTaskController
  data: HttpRequest
  uc: DeleteTaskUc
  i18n: Internationalization
  personalValidator: FieldValidator,
  createdTask: TaskEntity
}

const makeSut = async (): Promise<SutTypes> => {
  new Application(true)
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)
  const findTaskRepository = new DbFindTaskRepository(dbORM)
  const deleteTaskRepository = new DbDeleteTaskRepository(dbORM)
  const createTaskRepository = new DbCreateLinkRepository(dbORM)
  const uc = new DeleteTask(i18n, findTaskRepository, deleteTaskRepository)
  const personalValidator = new PersonalFieldValidator()
  const log = new Log
  const sut = new DeleteTaskController(personalValidator, log, uc)
  const taskData: CreateTaskDto = {
    name: 'Task ' + faker.word.adjective(5),
    description: faker.lorem.lines(3),
    statusId: Config.TASK_STATUS.TO_DO
  }
  const createdTask = await createTaskRepository.exec({ ...taskData })
  const data = makeHttpRequestMock({
    params: { taskId: createdTask.id }
  })
  return {
    sut,
    data,
    i18n,
    uc,
    personalValidator,
    createdTask
  }
}

describe('DeleteTaskController Integration', () => {
  test('Should return Ok if task was deleted successfully', async () => {
    const { sut, data, i18n } = await makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('DELETE_TASK_SUCCESSFUL'))
  })

  test('Should return 400 if the task to be deleted was not found', async () => {
    const { sut, i18n } = await makeSut()
    const data = makeHttpRequestMock({
      params: { taskId: 0 }
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(404)
    expect(res.body.msg).toBe(i18n.t('NOT_FOUND'))
  })

  test('Should return 500 if the task deletion was executed with server error', async () => {
    const { sut, uc, data } = await makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
