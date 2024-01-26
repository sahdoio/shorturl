import { faker } from '@faker-js/faker'
import { Application } from '../../../app'
import { FieldValidator } from '../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'
import { CreateTask } from '../../../app/data/useCases/task/create-task'
import { CreateTaskDto, CreateTaskUc } from '../../../app/domain/useCases/task/create-task'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import { Log } from '../../../app/implementations/helpers/log'
import { PersonalFieldValidator } from '../../../app/implementations/helpers/validate-fields'
import { I18n } from '../../../app/implementations/internationalization/i18n'
import { DbCreateTaskRepository } from '../../../app/implementations/repositories/task/db-create-task-repository'
import { CreateTaskController } from '../../../app/presentation/controllers/task/create-task'
import { missingFields } from '../../../app/presentation/helpers/response-builder'
import { HttpRequest } from '../../../app/presentation/protocols/http'
import Config from '../../../config/config'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'

interface SutTypes {
  sut: CreateTaskController
  data: HttpRequest
  uc: CreateTaskUc
  i18n: Internationalization
  personalValidator: FieldValidator,
  taskData: CreateTaskDto
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18n = new I18n()
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)
  const createTaskRepository = new DbCreateTaskRepository(dbORM)
  const uc = new CreateTask(i18n, createTaskRepository)
  const personalValidator = new PersonalFieldValidator()
  const log = new Log
  const sut = new CreateTaskController(personalValidator, log, uc)
  const taskData: CreateTaskDto = {
    name: 'Task ' + faker.word.adjective(5),
    description: faker.lorem.lines(3),
    statusId: Config.TASK_STATUS.TO_DO
  }
  const data = makeHttpRequestMock({
    body: {...taskData }
  })
  return {
    sut,
    data,
    i18n,
    uc,
    personalValidator,
    taskData
  }
}

describe('CreateTaskController Integration', () => {
  test('Should return Ok if task was created successfully', async () => {
    const { sut, data, i18n, taskData } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('CREATE_TASK_SUCCESSFUL'))
    expect(res.body?.data?.name).toBe(taskData.name)
  })

  test('Should return 422 if task creation was executed with missing parameters', async () => {
    const { sut } = makeSut()
    const data = makeHttpRequestMock({
      body: {}
    })
    const missingFieldsList = ['name']
    const errorResponse = missingFields(missingFieldsList)
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(422)
    expect(res.body.msg).toBe(errorResponse.msg)
  })

  test('Should return 500 if task creation was executed with server error', async () => {
    const { sut, uc, data } = makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
