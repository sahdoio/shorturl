import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { ILog } from '../../../data/protocols/utils/log'
import { serverError, serverResponse } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { missingFields } from '../../helpers/response-builder'
import { GetUrlDto, GetUrlUc } from '../../../domain/useCases/url/get-url'

export class GetUrlController implements Controller {
  constructor(
    private readonly validator: FieldValidator,
    private readonly log: ILog,
    private readonly uc: GetUrlUc
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { hash } = httpRequest.params
      const data: GetUrlDto = { hash }
      const res = await this.uc.exec(data)
      return serverResponse(res)
    } catch (err) {
      this.log.error(err)
      return serverError()
    }
  }
}
