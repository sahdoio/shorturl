import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { LoggedUser } from '../../domain/useCases/auth/authorizer'
import { HttpRequest } from '../../presentation/protocols/http'
import { Middleware } from '../../presentation/protocols/middleware'
import { DefaultRequest } from '../protocols/Request'

export const adaptMiddleware = (middleware: Middleware, isAuth: boolean = false) => {
  return async (req: DefaultRequest, res: Response, next: NextFunction) => {
    const request: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      currentUser: req.currentUser,
      request: {
        path: req.path,
        verb: req.method,
        route: req.route.path
      }
    }
    const middlewareResult = await middleware.handle(request)
    if (middlewareResult.statusCode === StatusCodes.OK) {
      if (isAuth) {
        req.currentUser = middlewareResult.body as LoggedUser
      }
      next()
    } else {
      res.status(middlewareResult.statusCode).json(middlewareResult.body)
    }
  }
}
