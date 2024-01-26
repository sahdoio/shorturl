import { AuthorizerUc, LoggedUser } from '../../../domain/useCases/auth/authorizer'
import { JWT } from '../../protocols/auth/jwt'
import { JwtConfig } from '../../protocols/auth/jwt-config'
import { FindUserRepository } from '../../protocols/repositories/user/find-user-repository'
import { ILog } from '../../protocols/utils/log'

export class Authorizer implements AuthorizerUc {
  constructor(
    private readonly jwt: JWT,
    private readonly jwtConfig: JwtConfig,
    private readonly findUserRepository: FindUserRepository,
    private readonly log: ILog,
  ) { }

  async isAuthorized(accessToken: string): Promise<LoggedUser | boolean> {
    try {
      const tokenData = await this.jwt.verify(accessToken, this.jwtConfig.key)
      if (!tokenData) {
        return false
      }
      const user = await this.findUserRepository.findOne({ id: tokenData.id })
      return {
        id: user.id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email
      }
    } catch (err) {
      this.log.error(err)
      return false
    }
  }
}
