import { UcOptions } from '../../domain/protocols/uc-options'
import { HttpRequest } from '../protocols/http'

export const makeUcOptions = (httpRequest: HttpRequest, fields?: string[]): UcOptions => ({
  isOrderByDesc: httpRequest.query?.isOrderByDesc,
  orderBy: httpRequest.query?.orderBy,
  itemsPerPage: parseInt(httpRequest.query?.itemsPerPage),
  currentPage: parseInt(httpRequest.query?.currentPage),
  fields
})
