import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors'
import { Result } from '../../domain/protocols/result'
import { StatusCodes } from 'http-status-codes'

export const serverResponse = (res: Result<any>): HttpResponse => ({
  statusCode: res.code,
  body: {
    msg: res.msg,
    data: res.data
  }
})

export const serverOk = (bodyContent?: any): HttpResponse => ({
  statusCode: StatusCodes.OK,
  body: bodyContent ?? null
})

export const serverError = (): HttpResponse => ({
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  body: new ServerError()
})

export const unauthorized = (msg?: string): HttpResponse => ({
  statusCode: StatusCodes.UNAUTHORIZED,
  body: {
    msg: msg ?? 'unauthorized'
  }
})

export const forbidden = (msg?: string): HttpResponse => ({
  statusCode: StatusCodes.FORBIDDEN,
  body: {
    msg: msg ?? 'forbidden'
  }
})
