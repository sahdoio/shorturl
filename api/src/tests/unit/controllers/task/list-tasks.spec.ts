import { Application } from '../../../../app'
import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { ListTasksUc } from '../../../../app/domain/useCases/task/list-tasks'
import { ListTasksController } from '../../../../app/presentation/controllers/task/list-tasks'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { findAllTasksMock } from '../../../utils/mocks/task/find-all-tasks-mock'
import { taskEntityMock } from '../../../utils/mocks/task/task-entity-mock'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { LogStub } from '../../../utils/stubs/log-stub'
import { ListTasksUcStub } from '../../../utils/stubs/useCases/task/list-tasks'

interface SutTypes {
  sut: ListTasksController
  data: HttpRequest
  uc: ListTasksUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const uc = new ListTasksUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const logStub = new LogStub
  const sut = new ListTasksController(personalValidatorStub, logStub, uc)
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

describe('ListTaskController', () => {
  test('Should return Ok if tasks were retrieved successfully', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('FIND_TASK_SUCCESSFUL'))
    expect(res.body.data).toBe(findAllTasksMock)
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
