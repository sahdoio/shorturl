import {
  ExternalHttpRequest,
  HttpRequestOptions
} from '../../data/protocols/utils/external-http-request'
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

export class AxiosHttpRequest implements ExternalHttpRequest {
  async exec(opts: HttpRequestOptions): Promise<AxiosPromise<any>> {
    const { url, method, body, headers, query, auth, timeout } = opts
    const axiosOptions: AxiosRequestConfig = {
      params: query,
      url,
      method,
      headers,
      data: body,
      auth,
      timeout
    }
    return axios(axiosOptions)
  }
}
