import { Application } from '../../../../app'
import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CreateTaskUc } from '../../../../app/domain/useCases/task/create-task'
import { CreateTaskController } from '../../../../app/presentation/controllers/task/create-task'
import { missingFields } from '../../../../app/presentation/helpers/response-builder'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { taskEntityMock } from '../../../utils/mocks/task/task-entity-mock'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { LogStub } from '../../../utils/stubs/log-stub'
import { CreateTaskUcStub } from '../../../utils/stubs/useCases/task/create-task'

interface SutTypes {
  sut: CreateTaskController
  data: HttpRequest
  uc: CreateTaskUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const uc = new CreateTaskUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const logStub = new LogStub
  const sut = new CreateTaskController(personalValidatorStub, logStub, uc)
  const data = makeHttpRequestMock({
    body: {
      taskEntityMock
    }
  })
  return {
    sut,
    data,
    i18nStub,
    uc,
    personalValidatorStub
  }
}

describe('CreateTaskController', () => {
  test('Should return Ok if task was created successfully', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('CREATE_TASK_SUCCESSFUL'))
    expect(res.body.data).toBe(taskEntityMock)
  })

  test('Should return 422 if task creation was executed with missing parameters', async () => {
    const { sut, personalValidatorStub } = makeSut()
    const data = makeHttpRequestMock({
      body: {}
    })
    const missingFieldsList = ['name']
    const errorResponse = missingFields(missingFieldsList)
    await jest.spyOn(personalValidatorStub, 'validate').mockImplementationOnce(() => {
      return {
        success: false,
        missingFields: missingFieldsList
      }
    })
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
