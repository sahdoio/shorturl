import { Request } from 'express'
import { LoggedUser } from '../../domain/useCases/auth/authorizer'

export interface DefaultRequest extends Request {
  currentUser: LoggedUser
}
