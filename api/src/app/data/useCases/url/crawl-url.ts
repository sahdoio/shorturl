import { LinkEntity } from '../../../domain/entities/Link'
import { Result } from '../../../domain/protocols/result'
import { ok } from '../../helpers/result'
import { CreateLinkRepository } from '../../protocols/repositories/link/create-link-repository'
import { Internationalization } from '../../protocols/utils/internationalization'
import { CrawlUrlUc, CrawlUrlDto } from '../../../domain/useCases/url/crawl-url'

export class CrawlUrl implements CrawlUrlUc {
  constructor (
    private readonly i18n: Internationalization,
    private readonly createLinkRepository: CreateLinkRepository
  ) { }

  async exec (data: CrawlUrlDto): Promise<Result<LinkEntity>> {
    const { url } = data
    const shortUrl = this.urlShortener.shortenUrl(data.url)
    const task = await this.createLinkRepository.exec({ name, description, statusId })
    return ok(this.i18n.t('CREATE_TASK_SUCCESSFUL'), task)
  }
}
