import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { ILog } from '../../../data/protocols/utils/log'
import { serverError, serverResponse } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { TopTrendingUc } from '../../../domain/useCases/trending/top-trending'

export class TopTrendingController implements Controller {
  constructor(
    private readonly log: ILog,
    private readonly uc: TopTrendingUc
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { hash } = httpRequest.params
      const res = await this.uc.exec()
      return serverResponse(res)
    } catch (err) {
      this.log.error(err)
      return serverError()
    }
  }
}
