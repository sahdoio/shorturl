import { Application } from '../../../../app'
import { notFound, ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { linkEntityMock } from '../../../utils/mocks/link/link-entity-mock'
import { DbFindLinkRepositoryStub } from '../../../utils/stubs/repositories/links/find-link-repository-stub'
import { UrlShortenerStub } from '../../../utils/stubs/helpers/url-shortener-stub'
import { CrawlUrl } from '../../../../app/data/useCases/url/crawl-url'
import { CreateLinkDetailsRepositoryStub } from '../../../utils/stubs/repositories/linkDetails/create-link-details-repository-stub'
import { WebCrawlerStub } from '../../../utils/stubs/helpers/web-crawler-stub'
import { CrawlUrlDto, CrawlUrlUc } from '../../../../app/domain/useCases/url/crawl-url'
import { FindLinkRepository } from '../../../../app/data/protocols/repositories/link/find-link-repository'
import env from '../../../../env'

interface SutTypes {
  sut: CrawlUrlUc
  i18nStub: Internationalization
  findLinkRepository: FindLinkRepository
  crawlUrlDto: CrawlUrlDto
}

const makeSut = (): SutTypes => {
  new Application(true)
  const urlShortener = new UrlShortenerStub(env.APP_HOST);
  const shortUrl = urlShortener.exec(linkEntityMock.url)
  const crawlUrlDto: CrawlUrlDto = {
    url: shortUrl.url,
    urlHash: shortUrl.urlHash
  }
  const i18nStub = new I18nStub()
  const webcrawler = new WebCrawlerStub()
  const findLinkRepository = new DbFindLinkRepositoryStub()
  const createLinkDetailsRepository = new CreateLinkDetailsRepositoryStub()
  const sut = new CrawlUrl(i18nStub, webcrawler, findLinkRepository, createLinkDetailsRepository)
  return {
    sut,
    i18nStub,
    findLinkRepository,
    crawlUrlDto
  }
}

describe('CrawlUrl', () => {
  test('Should return 200 if crawl url was executed successfully', async () => {
    const { sut, i18nStub, crawlUrlDto } = makeSut()
    const res = await sut.exec(crawlUrlDto)
    expect(res).toEqual(ok(i18nStub.t('CRAWLER_COMPLETED_SUCCESSFUL')))
  })

  test('Should return 404 trying to crawl url', async () => {
    const { sut, i18nStub, findLinkRepository, crawlUrlDto } = makeSut()
    // @ts-ignore
    await jest.spyOn(findLinkRepository, 'findOne').mockImplementationOnce(async () => null);
    const res = await sut.exec(crawlUrlDto)
    expect(res).toEqual(notFound(i18nStub.t('NOT_FOUND')))
  })
})
