import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CreateUserUc } from '../../../../app/domain/useCases/user/create-user'
import { CreateUserController } from '../../../../app/presentation/controllers/user/create-user'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { CreateUserUcStub } from '../../../utils/stubs/useCases/user/create-user'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { Application } from '../../../../app'
import { missingFields } from '../../../../app/presentation/helpers/response-builder'
import { LogStub } from '../../../utils/stubs/log-stub'

interface SutTypes {
  sut: CreateUserController
  data: HttpRequest
  uc: CreateUserUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const uc = new CreateUserUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const logStub = new LogStub
  const sut = new CreateUserController(personalValidatorStub, logStub, uc)
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

describe('CreateUserController', () => {
  test('Should return Ok if user was created successfully', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('CREATE_USER_SUCCESSFUL'))
    expect(res.body.data).toBe(userEntityMock)
  })

  test('Should return 422 if user creation was executed with missing parameters', async () => {
    const { sut, personalValidatorStub } = makeSut()
    const data = makeHttpRequestMock({
      body: {}
    })
    const missingFieldsList = ['email', 'firstName', 'lastName', 'phoneNumber', 'password']
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

  test('Should return 500 if user creation was executed with server error', async () => {
    const { sut, uc, data } = makeSut()
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
