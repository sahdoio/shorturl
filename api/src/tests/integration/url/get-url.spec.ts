import { faker } from '@faker-js/faker'
import { Application } from '../../../app'
import { FieldValidator } from '../../../app/data/protocols/utils/field-validator'
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
import { GetUrlController } from '../../../app/presentation/controllers/url/get-url'
import { GetUrlDto, GetUrlUc } from '../../../app/domain/useCases/url/get-url'
import { GetUrl } from '../../../app/data/useCases/url/get-url'
import { DbFindLinkRepository } from '../../../app/implementations/repositories/links/db-find-link-repository'
import { DbUpdateLinkRepository } from '../../../app/implementations/repositories/links/db-update-link-repository'
import { LinkEntity } from '../../../app/domain/entities/Link'
import Config from '../../../config/config'
import { Result } from '../../../app/domain/protocols/result'

interface SutTypes {
  sut: GetUrlController
  data: HttpRequest
  uc: GetUrlUc
  i18n: Internationalization
  personalValidator: FieldValidator
  getUrlDto: GetUrlDto,
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
  const validator = new PersonalFieldValidator()
  const log = new Log
  const uc = new GetUrl(i18n, findLinkRepository, updateLinkRepository)
  const sut = new GetUrlController(validator, log, uc)
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
    personalValidator,
    getUrlDto,
    link
  }
}

describe('GetUrl Integration', () => {
  test('Should return Ok if get url was executed successfully', async () => {
    const { sut, data, i18n, link } = await makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('URL_FOUND_SUCCESSFULLY'))
    expect(res.body.data).toBe(link.url)
  })

  test('Should return 500 if get url process was executed with server error', async () => {
    const { sut, uc, data } = await makeSut()
    // @ts-ignore
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
