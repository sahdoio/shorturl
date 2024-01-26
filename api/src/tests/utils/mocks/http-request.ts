import { HttpRequest } from '../../../app/presentation/protocols/http'

interface MakeHttpRequestMockDto {
  params?: any
  body?: any
  query?: any
  headers?: any
  currentUser?: any
}

export const makeHttpRequestMock = (obj?: MakeHttpRequestMockDto): HttpRequest => ({
  request: {
    path: 'any',
    route: 'any',
    verb: 'any'
  },
  params: obj?.params,
  body: obj?.body,
  query: obj?.query,
  headers: obj?.headers,
  currentUser: obj?.currentUser
})
