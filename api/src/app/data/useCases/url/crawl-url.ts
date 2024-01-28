import { LinkEntity } from '../../../domain/entities/Link'
import { Result } from '../../../domain/protocols/result'
import { notFound, ok } from '../../helpers/result'
import { Internationalization } from '../../protocols/utils/internationalization'
import { CrawlUrlUc, CrawlUrlDto } from '../../../domain/useCases/url/crawl-url'
import { IWebCrawler } from '../../protocols/utils/web-crawler'
import { CreateLinkDetailsRepository } from '../../protocols/repositories/link-details/create-link-details-repository'
import { FindLinkRepository } from '../../protocols/repositories/link/find-link-repository'

export class CrawlUrl implements CrawlUrlUc {
  constructor(
    private readonly i18n: Internationalization,
    private readonly webCrawler: IWebCrawler,
    private readonly findLinkRepository: FindLinkRepository,
    private readonly createLinkDetailsRepository: CreateLinkDetailsRepository
  ) {
  }

  async exec(data: CrawlUrlDto): Promise<Result<LinkEntity>> {
    const { url, urlHash } = data
    const link = await this.findLinkRepository.findOne({ urlHash })
    if (!link) {
      return notFound(this.i18n.t('NOT_FOUND'))
    }
    const result = await this.webCrawler.findOne(url, 'title')
    const title = result ?? 'No title found'
    await this.createLinkDetailsRepository.exec({ linkId: link.id, url, name: 'title', value: title })
    return ok(this.i18n.t('CRAWLER_COMPLETED_SUCCESSFUL'))
  }
}
