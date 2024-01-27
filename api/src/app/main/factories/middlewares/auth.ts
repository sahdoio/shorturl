import env from '../../../../env'
import { Authorizer } from '../../../data/useCases/auth/authorizer'
import { SequelizeORM } from '../../../implementations/database/sequelize'
import { JsonWebToken } from '../../../implementations/encrypters/jwt'
import { Log } from '../../../implementations/helpers/log'
import { DbFindLinkDetailsRepository } from '../../../implementations/repositories/linkDetails/db-find-link-details-repository'
import { AuthorizationMiddleware } from '../../../presentation/middlewares/authorization'

export const makeAuthMiddleware = (): AuthorizationMiddleware => {
  const log = new Log
  const jwt = new JsonWebToken(log)
  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const dbORM = SequelizeORM.getInstance()
  const findUserRepository = new DbFindLinkDetailsRepository(dbORM)
  const auth = new Authorizer(jwt, jwtConfig, findUserRepository, log)
  const middleware = new AuthorizationMiddleware(auth)
  return middleware
}
