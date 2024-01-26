import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { LoginUc } from '../../../../app/domain/useCases/auth/login'
import { LoginController } from '../../../../app/presentation/controllers/auth/login'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { LoginUcStub } from '../../../utils/stubs/useCases/auth/login'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { Application } from '../../../../app'
import { LogStub } from '../../../utils/stubs/log-stub'
import { missingFields } from '../../../../app/presentation/helpers/response-builder'

interface SutTypes {
  sut: LoginController
  data: HttpRequest
  uc: LoginUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const uc = new LoginUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const logStub = new LogStub
  const sut = new LoginController(personalValidatorStub, logStub, uc)
  const data = makeHttpRequestMock({
    body: {
      userEntityMock
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

describe('LoginController', () => {
  test('Should return Ok if login was executed successfully', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('LOGIN_SUCCESSFUL'))
  })

  test('Should return 422 if login was executed with missing parameters', async () => {
    const { sut, personalValidatorStub } = makeSut()
    const data = makeHttpRequestMock({
      body: {}
    })
    const missingFieldsList = ['email', 'password']
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

  test('Should return 500 if login was executed with server error', async () => {
    const { sut, uc, data } = makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
