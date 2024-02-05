import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HttpRequest } from '../../presentation/protocols/http'
import { Middleware } from '../../presentation/protocols/middleware'
import { DefaultRequest } from '../protocols/Request'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: DefaultRequest, res: Response, next: NextFunction) => {
    const request: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      request: {
        path: req.path,
        verb: req.method,
        route: req.route.path
      }
    }
    const middlewareResult = await middleware.handle(request)
    if (middlewareResult.statusCode === StatusCodes.OK) {
      next()
    } else {
      res.status(middlewareResult.statusCode).json(middlewareResult.body)
    }
  }
}
