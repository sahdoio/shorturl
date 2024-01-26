import { Application } from '../../../../app'
import { ok, unprocessableEntity } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { Login } from '../../../../app/data/useCases/auth/login'
import { LoginUc } from '../../../../app/domain/useCases/auth/login'
import env from '../../../../env'
import { loginResponseMock } from '../../../utils/mocks/auth/login-response--mock'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { BcryptStub } from '../../../utils/stubs/bcrypt-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { JwtStub } from '../../../utils/stubs/jwt-stub'
import { FindUserRepositoryStub } from '../../../utils/stubs/repositories/user/find-user-repository-stub'

interface LoginCredentials {
  email: string,
  password: string
}

interface SutTypes {
  sut: LoginUc
  i18nStub: Internationalization
  findUserRepositoryStub: FindUserRepositoryStub,
  loginCredentials: LoginCredentials
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const bcryptStub = new BcryptStub()
  const jwtStub = new JwtStub()
  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const findUserRepositoryStub = new FindUserRepositoryStub()
  const loginCredentials: LoginCredentials = {
    email: userEntityMock.email,
    password: userEntityMock.password
  }
  const sut = new Login(
    i18nStub,
    bcryptStub,
    jwtStub,
    jwtConfig,
    findUserRepositoryStub
  )
  return {
    sut,
    i18nStub,
    findUserRepositoryStub,
    loginCredentials
  }
}

describe('Login', () => {
  test('Should return 200 if the login was executed successfully', async () => {
    const { sut, i18nStub, loginCredentials } = makeSut()
    const res = await sut.exec(loginCredentials.email, loginCredentials.password)
    expect(res).toEqual(ok(i18nStub.t('LOGIN_SUCCESSFUL'), await loginResponseMock))
  })

  test('Should return 422 if user not found', async () => {
    const { sut, i18nStub, findUserRepositoryStub, loginCredentials } = makeSut()
    await jest.spyOn(findUserRepositoryStub, 'findOne').mockImplementationOnce(async () => null)
    const res = await sut.exec(loginCredentials.email, loginCredentials.password)
    expect(res).toEqual(unprocessableEntity(i18nStub.t('INVALID_LOGIN')))
  })

  test('Should return 422 if login credentials are incorrect', async () => {
    const { sut, i18nStub } = makeSut()
    const res = await sut.exec('wrong_email@test.com', 'wrong_password')
    expect(res).toEqual(unprocessableEntity(i18nStub.t('INVALID_LOGIN')))
  })
})
