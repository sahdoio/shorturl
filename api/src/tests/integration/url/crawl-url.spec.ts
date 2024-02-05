import { Application } from '../../../app'
import { FieldValidator } from '../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import { Log } from '../../../app/implementations/helpers/log'
import { PersonalFieldValidator } from '../../../app/implementations/helpers/validate-fields'
import { I18n } from '../../../app/implementations/internationalization/i18n'
import { UrlShortener } from '../../../app/implementations/helpers/url-shortener'
import env from '../../../env'
import { DbCreateLinkRepository } from '../../../app/implementations/repositories/links/db-create-link-repository'
import { ShortenUrl } from '../../../app/data/useCases/url/shorten-url'
import { QueueManager } from '../../../app/implementations/helpers/queue-manager'
import { DbFindLinkRepository } from '../../../app/implementations/repositories/links/db-find-link-repository'
import { DbUpdateLinkRepository } from '../../../app/implementations/repositories/links/db-update-link-repository'
import { LinkEntity } from '../../../app/domain/entities/Link'
import Config from '../../../config/config'
import { Result } from '../../../app/domain/protocols/result'
import { CrawlUrlController } from '../../../app/presentation/controllers/url/crawl-url'
import { CrawlUrlDto, CrawlUrlUc } from '../../../app/domain/useCases/url/crawl-url'
import { makeJobRequestMock } from '../../utils/mocks/job-request'
import { JobRequest } from '../../../app/presentation/protocols/job-request'
import { CrawlUrl } from '../../../app/data/useCases/url/crawl-url'
import { WebCrawler } from '../../../app/implementations/helpers/web-crawler'
import {
  DbCreateLinkDetailsRepository
} from '../../../app/implementations/repositories/linkDetails/db-create-link-details-repository'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'
import { missingFields } from '../../../app/presentation/helpers/response-builder'
import { notFound } from '../../../app/data/helpers/result'

interface SutTypes {
  sut: CrawlUrlController
  data: JobRequest
  uc: CrawlUrlUc
  i18n: Internationalization
  personalValidator: FieldValidator
  crawlUrlDto: CrawlUrlDto,
  link: LinkEntity
}

const makeSut = async (): Promise<SutTypes> => {
  // test database setup
  new Application(true)
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)

  const url = 'http://sahdo.io'
  const i18n = new I18n()
  const findLinkRepository = new DbFindLinkRepository(dbORM)
  const urlShortener = new UrlShortener(env.APP_HOST);
  const createLinkRepository = new DbCreateLinkRepository(dbORM)
  const shortenUrl = new ShortenUrl(i18n, urlShortener, QueueManager.getInstance(), createLinkRepository)
  const shortenUrlResponse: Result<string> = await shortenUrl.exec({ url })
  const urlHash: string = shortenUrlResponse?.data.split('/').last() as unknown as string
  const link = await findLinkRepository.findOne({ urlHash })
  const personalValidator = new PersonalFieldValidator()
  const validator = new PersonalFieldValidator()
  const log = new Log
  const webcrawler = new WebCrawler()
  const createLinkDetailsRepository = new DbCreateLinkDetailsRepository(dbORM)
  const uc = new CrawlUrl(i18n, webcrawler, findLinkRepository, createLinkDetailsRepository)
  const sut = new CrawlUrlController(validator, log, uc)
  const crawlUrlDto: CrawlUrlDto = {
    url,
    urlHash
  }
  const data = makeJobRequestMock({
    jobId: 1,
    body: { ...crawlUrlDto }
  })
  return {
    sut,
    data,
    i18n,
    uc,
    personalValidator,
    crawlUrlDto,
    link
  }
}

describe('CrawlUrl Integration', () => {
  test('Should return Ok if crawl url was executed successfully', async () => {
    const { sut, data, i18n, link } = await makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.msg).toBe(i18n.t('CRAWLER_COMPLETED_SUCCESSFUL'))
  })

  test('Should return 500 if crawl url process was executed with server error', async () => {
    const { sut, uc, data } = await makeSut()
    // @ts-ignore
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })

  test('Should return 500 if crawl url was executed with missing parameters', async () => {
    const { sut } = await makeSut()
    const data = makeJobRequestMock({
      jobId: 1,
      body: {}
    })
    const missingFieldsList = ['url', 'urlHash']
    const errorResponse = missingFields(missingFieldsList)
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })

  test('Should return 500 if crawl url process was executed and link was not found', async () => {
    const { sut, i18n, uc, data } = await makeSut()
    // @ts-ignore
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      return notFound(i18n.t('NOT_FOUND'))
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
