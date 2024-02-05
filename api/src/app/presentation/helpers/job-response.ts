import { ServerError } from '../errors'
import { StatusCodes } from 'http-status-codes'
import { JobResponse } from '../protocols/job-response'

export const jobOk = (msg?: string, data?: any): JobResponse => ({
  statusCode: StatusCodes.OK,
  msg,
  data: data ?? null
})

export const jobError = (): JobResponse => ({
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  msg: 'Internal server error',
  data: new ServerError()
})
