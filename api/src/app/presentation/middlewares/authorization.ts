import { AuthorizerUc } from '../../domain/useCases/auth/authorizer'
import { serverOk, unauthorized } from '../helpers/http'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthorizationMiddleware implements Middleware {
  constructor (
    private readonly authorizer: AuthorizerUc
  ) {}

  async handle (data: HttpRequest): Promise<HttpResponse> {
    const isAuthorized = await this.authorizer.isAuthorized(data.headers.authorization)
    return isAuthorized
      ? serverOk(isAuthorized)
      : unauthorized()
  }
}
