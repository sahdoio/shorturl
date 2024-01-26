import { Application } from '../../../../app'
import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { UpdateTaskUc } from '../../../../app/domain/useCases/task/update-task'
import { UpdateTaskController } from '../../../../app/presentation/controllers/task/update-task'
import { missingFields } from '../../../../app/presentation/helpers/response-builder'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import Config from '../../../../config/config'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { taskEntityMock } from '../../../utils/mocks/task/task-entity-mock'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { LogStub } from '../../../utils/stubs/log-stub'
import { UpdateTaskUcStub } from '../../../utils/stubs/useCases/task/update-task'

interface SutTypes {
  sut: UpdateTaskController
  data: HttpRequest
  uc: UpdateTaskUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const uc = new UpdateTaskUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const logStub = new LogStub
  const sut = new UpdateTaskController(personalValidatorStub, logStub, uc)
  const data = makeHttpRequestMock({
    params: { taskId: taskEntityMock.id },
    body: { statusId: Config.TASK_STATUS.IN_PROGRESS }
  })
  return {
    sut,
    data,
    i18nStub,
    uc,
    personalValidatorStub
  }
}

describe('UpdateTaskController', () => {
  test('Should return Ok if task was updated successfully', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('UPDATE_TASK_SUCCESSFUL'))
  })

  test('Should return 422 if task update was executed with missing parameters', async () => {
    const { sut, personalValidatorStub } = makeSut()
    const data = makeHttpRequestMock({
      body: {}
    })
    const missingFieldsList = ['statusId']
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

  test('Should return 422 if task update was executed with invalid statusId', async () => {
    const { sut, data } = makeSut()
    const res = await sut.handle( { ...data, body: { statusId: 9999999 } })
    expect(res.statusCode).toBe(422)
  })

  test('Should return 500 if task update was executed with server error', async () => {
    const { sut, uc, data } = makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
