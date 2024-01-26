import { HttpRequest } from '../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'
import { Application } from '../../../app'
import { AuthorizationMiddleware } from '../../../app/presentation/middlewares/authorization'
import { AuthorizerUcStub } from '../../utils/stubs/useCases/auth/authorizer'
import { AuthorizerUc } from '../../../app/domain/useCases/auth/authorizer'
import { serverOk } from '../../../app/presentation/helpers/http'
import { loggedUserMock } from '../../utils/mocks/auth/logged-user-mock'

interface SutTypes {
  sut: AuthorizationMiddleware
  data: HttpRequest
  uc: AuthorizerUc
}

const makeSut = (): SutTypes => {
  new Application(true)
  const uc = new AuthorizerUcStub()
  const sut = new AuthorizationMiddleware(uc)
  const data = makeHttpRequestMock({
    headers: {
      authorization: 'token'
    }
  })
  return {
    sut,
    data,
    uc
  }
}

describe('AuthorizationMiddleware', () => {
  test('Should return Ok if login was executed successfully', async () => {
    const { sut, data } = makeSut()
    const res = await sut.handle(data)
    const expected = serverOk({ ...loggedUserMock })
    expect(res.statusCode).toBe(expected.statusCode)
    expect(res.body.data).toBe(expected.body.data)
  })
})
