import { Application } from '../../../../app'
import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { DeleteTaskUc } from '../../../../app/domain/useCases/task/delete-task'
import { DeleteTaskController } from '../../../../app/presentation/controllers/task/delete-task'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { taskEntityMock } from '../../../utils/mocks/task/task-entity-mock'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { LogStub } from '../../../utils/stubs/log-stub'
import { DeleteTaskUcStub } from '../../../utils/stubs/useCases/task/delete-task'

interface SutTypes {
  sut: DeleteTaskController
  data: HttpRequest
  uc: DeleteTaskUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const uc = new DeleteTaskUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const logStub = new LogStub
  const sut = new DeleteTaskController(personalValidatorStub, logStub, uc)
  const data = makeHttpRequestMock({
    params: {
      taskId: taskEntityMock.id
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

describe('DeleteTaskController', () => {
  test('Should return Ok if task was deleted successfully', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('DELETE_TASK_SUCCESSFUL'))
  })

  test('Should return 500 if task deletion was executed with server error', async () => {
    const { sut, uc, data } = makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
