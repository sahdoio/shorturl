import { faker } from '@faker-js/faker'
import { Application } from '../../../app'
import { FieldValidator } from '../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'
import { DeleteTask } from '../../../app/data/useCases/task/delete-task'
import { UpdateTask } from '../../../app/data/useCases/task/update-task'
import { TaskEntity } from '../../../app/domain/entities/Task'
import { CreateTaskDto } from '../../../app/domain/useCases/task/create-task'
import { DeleteTaskUc } from '../../../app/domain/useCases/task/delete-task'
import { UpdateTaskUc } from '../../../app/domain/useCases/task/update-task'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import { Log } from '../../../app/implementations/helpers/log'
import { PersonalFieldValidator } from '../../../app/implementations/helpers/validate-fields'
import { I18n } from '../../../app/implementations/internationalization/i18n'
import { DbCreateTaskRepository } from '../../../app/implementations/repositories/task/db-create-task-repository'
import { DbDeleteTaskRepository } from '../../../app/implementations/repositories/task/db-delete-task-repository'
import { DbFindTaskRepository } from '../../../app/implementations/repositories/task/db-find-task-repository'
import { DbUpdateTaskRepository } from '../../../app/implementations/repositories/task/db-update-task-repository'
import { DeleteTaskController } from '../../../app/presentation/controllers/task/delete-task'
import { UpdateTaskController } from '../../../app/presentation/controllers/task/update-task'
import { HttpRequest } from '../../../app/presentation/protocols/http'
import Config from '../../../config/config'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'

interface SutTypes {
  sut: UpdateTaskController
  data: HttpRequest
  uc: UpdateTaskUc
  i18n: Internationalization
  personalValidator: FieldValidator,
  createdTask: TaskEntity
}

const makeSut = async (): Promise<SutTypes> => {
  new Application(true)
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)
  const findTaskRepository = new DbFindTaskRepository(dbORM)
  const updateTaskRepository = new DbUpdateTaskRepository(dbORM)
  const createTaskRepository = new DbCreateTaskRepository(dbORM)
  const uc = new UpdateTask(i18n, findTaskRepository, updateTaskRepository)
  const personalValidator = new PersonalFieldValidator()
  const log = new Log
  const sut = new UpdateTaskController(personalValidator, log, uc)
  const taskData: CreateTaskDto = {
    name: 'Task ' + faker.word.adjective(5),
    description: faker.lorem.lines(3),
    statusId: Config.TASK_STATUS.TO_DO
  }
  const createdTask = await createTaskRepository.exec({ ...taskData })
  const data = makeHttpRequestMock({
    params: { taskId: createdTask.id },
    body: { statusId: Config.TASK_STATUS.IN_PROGRESS }
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

describe('UpdateTaskController Integration', () => {
  test('Should return Ok if task was updated successfully', async () => {
    const { sut, data, i18n } = await makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('UPDATE_TASK_SUCCESSFUL'))
  })

  test('Should return 400 if the task to be updated was not found', async () => {
    const { sut, i18n, data } = await makeSut()
    const res = await sut.handle( { ...data, params: { taskId: 0 } })
    expect(res.statusCode).toBe(404)
    expect(res.body.msg).toBe(i18n.t('NOT_FOUND'))
  })

  test('Should return 422 if task update was executed with invalid statusId', async () => {
    const { sut, data } = await makeSut()
    const res = await sut.handle( { ...data, body: { statusId: 9999999 } })
    expect(res.statusCode).toBe(422)
  })

  test('Should return 500 if the task update was executed with server error', async () => {
    const { sut, uc, data } = await makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
