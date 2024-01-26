import { StatusCodes } from 'http-status-codes'

export const ok = (msg?: string, data?: any): any => ({
  code: StatusCodes.OK,
  msg,
  data
})

export const unprocessableEntity = (msg?: string, data?: any): any => ({
  code: StatusCodes.UNPROCESSABLE_ENTITY,
  msg,
  data
})

export const notFound = (msg?: string, data?: any): any => ({
  code: StatusCodes.NOT_FOUND,
  msg,
  data
})