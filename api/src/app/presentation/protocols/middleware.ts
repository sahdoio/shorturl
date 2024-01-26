import { HttpRequest, HttpResponse } from './http'

export interface Middleware {
  handle: (data: HttpRequest) => Promise<HttpResponse>
}
