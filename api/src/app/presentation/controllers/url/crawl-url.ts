import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { ILog } from '../../../data/protocols/utils/log'
import { serverError, serverResponse } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { missingFields } from '../../helpers/response-builder'
import { CrawlUrlDto, CrawlUrlUc } from '../../../domain/useCases/url/crawl-url'
import { JobController } from '../../protocols/job-controller'
import { JobRequest } from '../../protocols/job-request'

export class CrawlUrlController implements JobController {
  constructor(
    private readonly validator: FieldValidator,
    private readonly log: ILog,
    private readonly uc: CrawlUrlUc
  ) { }

  async handle(request: JobRequest): Promise<void> {
    try {
      const requiredFields = ['url', 'urlHash']
      const validation = this.validator.validate(requiredFields, request.body)
      if (!validation.success) {
        throw new Error(missingFields(validation.missingFields).msg)
      }
      const { url, urlHash } = request.body
      const data: CrawlUrlDto = { url, urlHash }
      const res = await this.uc.exec(data)
    } catch (err) {
      this.log.error(err)
    }
  }
}
