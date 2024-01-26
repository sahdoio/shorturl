import { Application } from '../../../../app'
import { Authorizer } from '../../../../app/data/useCases/auth/authorizer'
import { AuthorizerUc } from '../../../../app/domain/useCases/auth/authorizer'
import env from '../../../../env'
import { authorizerResponseMock } from '../../../utils/mocks/auth/authorizer-response-mock'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { JwtStub } from '../../../utils/stubs/jwt-stub'
import { LogStub } from '../../../utils/stubs/log-stub'
import { FindUserRepositoryStub } from '../../../utils/stubs/repositories/user/find-user-repository-stub'

interface LoginCredentials {
  email: string,
  password: string
}

interface SutTypes {
  sut: AuthorizerUc
  findUserRepositoryStub: FindUserRepositoryStub,
  jwtStub: JwtStub,
  loginCredentials: LoginCredentials,
  token: string
}

const makeSut = (): SutTypes => {
  new Application(true)
  const jwtStub = new JwtStub()
  const logStub = new LogStub()
  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const findUserRepositoryStub = new FindUserRepositoryStub()
  const loginCredentials: LoginCredentials = {
    email: userEntityMock.email,
    password: userEntityMock.password
  }
  const token = 'token'
  const sut = new Authorizer(
      jwtStub,
      jwtConfig,
      findUserRepositoryStub,
      logStub
  )
  return {
    sut,
    findUserRepositoryStub,
    jwtStub,
    loginCredentials,
    token
  }
}

describe('Authorizer', () => {
  test('Should return logged user if operation is authorized', async () => {
    const { sut, token } = makeSut()
    const res = await sut.isAuthorized(token)
    expect(res).toEqual(authorizerResponseMock)
  })

  test('Should return false if operation is unauthorized', async () => {
    const { sut, token, jwtStub } = makeSut()
    await jest.spyOn(jwtStub, 'verify').mockImplementationOnce(async () => null)
    const res = await sut.isAuthorized(token)
    expect(res).toEqual(false)
  })

  test('Should return false if some error occurs', async () => {
    const { sut, token, jwtStub } = makeSut()
    await jest.spyOn(jwtStub, 'verify').mockImplementationOnce(async () => {
        throw new Error('server error')
    })
    const res = await sut.isAuthorized(token)
    expect(res).toEqual(false)
  })
})
