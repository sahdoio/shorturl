import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { ILog } from '../../../data/protocols/utils/log'
import { missingFields } from '../../helpers/response-builder'
import { CrawlUrlDto, CrawlUrlUc } from '../../../domain/useCases/url/crawl-url'
import { JobController } from '../../protocols/job-controller'
import { JobRequest } from '../../protocols/job-request'
import { jobError, jobOk } from '../../helpers/job-response'
import { JobResponse } from '../../protocols/job-response'

export class CrawlUrlController implements JobController {
  constructor(
    private readonly validator: FieldValidator,
    private readonly log: ILog,
    private readonly uc: CrawlUrlUc
  ) { }

  async handle(request: JobRequest): Promise<JobResponse> {
    try {
      const requiredFields = ['url', 'urlHash']
      const validation = this.validator.validate(requiredFields, request.body)
      if (!validation.success) {
        throw new Error(missingFields(validation.missingFields).msg)
      }
      const { url, urlHash } = request.body
      const data: CrawlUrlDto = { url, urlHash }
      const res = await this.uc.exec(data)
      if (res.code !== 200) {
        throw new Error(res.msg)
      }
      return jobOk(res.msg, res.data)
    } catch (err) {
      this.log.error(err)
      return jobError()
    }
  }
}
