import { Application } from '../../../app'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'
import { SequelizeORM } from '../../../app/implementations/database/sequelize'
import { Log } from '../../../app/implementations/helpers/log'
import { PersonalFieldValidator } from '../../../app/implementations/helpers/validate-fields'
import { I18n } from '../../../app/implementations/internationalization/i18n'
import { HttpRequest } from '../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../utils/mocks/http-request'
import { UrlShortener } from '../../../app/implementations/helpers/url-shortener'
import env from '../../../env'
import { DbCreateLinkRepository } from '../../../app/implementations/repositories/links/db-create-link-repository'
import { ShortenUrl } from '../../../app/data/useCases/url/shorten-url'
import { QueueManager } from '../../../app/implementations/helpers/queue-manager'
import { TopTrendingController } from '../../../app/presentation/controllers/trending/top-trending'
import { TopTrendingUc } from '../../../app/domain/useCases/trending/top-trending'
import Config from '../../../config/config'
import { DbFindLinkRepository } from '../../../app/implementations/repositories/links/db-find-link-repository'
import { DbUpdateLinkRepository } from '../../../app/implementations/repositories/links/db-update-link-repository'
import { Result } from '../../../app/domain/protocols/result'
import { GetUrl } from '../../../app/data/useCases/url/get-url'
import { GetUrlDto } from '../../../app/domain/useCases/url/get-url'
import { TopTrending } from '../../../app/data/useCases/trendings/top-trending'
import { LinkEntity } from '../../../app/domain/entities/Link'
import { notFound } from '../../../app/data/helpers/result'

interface SutTypes {
  sut: TopTrendingController
  data: HttpRequest
  uc: TopTrendingUc
  i18n: Internationalization
  link: LinkEntity
}

const makeSut = async (): Promise<SutTypes> => {
  // test database setup
  new Application(true)
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)

  const url = 'http://sahdo.io'
  const i18n = new I18n()
  const findLinkRepository = new DbFindLinkRepository(dbORM)
  const updateLinkRepository = new DbUpdateLinkRepository(dbORM)
  const urlShortener = new UrlShortener(env.APP_HOST);
  const createLinkRepository = new DbCreateLinkRepository(dbORM)
  const shortenUrl = new ShortenUrl(i18n, urlShortener, QueueManager.getInstance(), createLinkRepository)
  const shortenUrlResponse: Result<string> = await shortenUrl.exec({ url })
  const urlHash: string = shortenUrlResponse?.data.split('/').last() as unknown as string
  const link = await findLinkRepository.findOne({ urlHash })
  const personalValidator = new PersonalFieldValidator()
  const log = new Log
  const getUrl = new GetUrl(i18n, findLinkRepository, updateLinkRepository)
  await getUrl.exec({ hash: urlHash })
  const uc = new TopTrending(i18n, findLinkRepository)
  const sut = new TopTrendingController(log, uc)
  const getUrlDto: GetUrlDto = {
    hash: urlHash
  }
  const data = makeHttpRequestMock({
    params: { ...getUrlDto }
  })
  return {
    sut,
    data,
    i18n,
    uc,
    link
  }
}

describe('TopTrending Integration', () => {
  test('Should return Ok if top trending was executed successfully', async () => {
    const { sut, data, i18n } = await makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('TOP_TRENDING_EXECUTED_SUCCESSFULLY'))
    expect(res.body.data.metadata.totalOfRegisters).toBeGreaterThan(0)
  })

  test('Should return 500 if top trending was executed and link was not found', async () => {
    const { sut, uc, data } = await makeSut()
    // @ts-ignore
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
