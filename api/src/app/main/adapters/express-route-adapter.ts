/* istanbul ignore file */

import i18n from 'i18n'
import { Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'
import { DefaultRequest } from '../protocols/Request'

export const adaptRoute = (controller: Controller) => {
  return async (req: DefaultRequest, res: Response) => {
    const lang: string = req.query.lang as string
    if (lang) {
      i18n.setLocale(lang)
    }
    const httpRequest: HttpRequest = {
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
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
