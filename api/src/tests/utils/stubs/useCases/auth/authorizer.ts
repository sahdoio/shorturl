import { AuthorizerUc, LoggedUser } from '../../../../../app/domain/useCases/auth/authorizer'
import { loggedUserMock } from '../../../mocks/auth/logged-user-mock'

export class AuthorizerUcStub implements AuthorizerUc {
  isAuthorized(accessToken: string): Promise<boolean | LoggedUser> {
    return new Promise((resolve, reject) => {
      resolve(loggedUserMock)
    })
  }
}
