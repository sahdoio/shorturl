import { LoggedUser } from '../../domain/useCases/auth/authorizer'

export interface Request {
  verb: string
  path: string
  route: string
}
export interface HttpResponse {
  statusCode: number
  body?: any
}
export interface HttpRequest {
  request: Request
  body?: any
  query?: any
  params?: any
  headers?: any
  currentUser?: LoggedUser
}
