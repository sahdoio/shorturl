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
import { ShortenUrlController } from '../../../app/presentation/controllers/url/shorten-url'
import { ShortenUrlDto, ShortenUrlUc } from '../../../app/domain/useCases/url/shorten-url'
import { IUrlShortener } from '../../../app/data/protocols/utils/url-shotener'
import { missingFields } from '../../../app/presentation/helpers/response-builder'
import Config from '../../../config/config'

interface SutTypes {
  sut: ShortenUrlController
  data: HttpRequest
  uc: ShortenUrlUc
  i18n: Internationalization
  personalValidator: FieldValidator
  urlShortener: IUrlShortener
  shortenUrlDto: ShortenUrlDto
}

const makeSut = (): SutTypes => {
  new Application(true)
  const dbORM = SequelizeORM.getInstance(Config.DATABASE.SOURCE.TEST)

  const i18n = new I18n()
  const urlShortener = new UrlShortener(env.APP_HOST);
  const createLinkRepository = new DbCreateLinkRepository(dbORM)
  const uc = new ShortenUrl(i18n, urlShortener, QueueManager.getInstance(), createLinkRepository)
  const personalValidator = new PersonalFieldValidator()
  const validator = new PersonalFieldValidator()
  const log = new Log
  const sut = new ShortenUrlController(validator, log, uc)
  const shortenUrlDto: ShortenUrlDto = {
    url: faker.internet.url()
  }
  const data = makeHttpRequestMock({
    body: { ...shortenUrlDto }
  })
  return {
    sut,
    data,
    i18n,
    uc,
    personalValidator,
    urlShortener,
    shortenUrlDto
  }
}

describe('ShortenUrl Integration', () => {
  test('Should return Ok if url was shortened successfully', async () => {
    const { sut, data, i18n, urlShortener, shortenUrlDto } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18n.t('SHORTENED_URL_SUCCESSFULLY'))
  })

  test('Should return 422 if url shorten process was executed with missing parameters', async () => {
    const { sut } = makeSut()
    const data = makeHttpRequestMock({
      body: {}
    })
    const missingFieldsList = ['url']
    const errorResponse = missingFields(missingFieldsList)
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(422)
    expect(res.body.msg).toBe(errorResponse.msg)
  })

  test('Should return 500 if url shorten process was executed with server error', async () => {
    const { sut, uc, data } = makeSut()
    // @ts-ignore
    await jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error')
    })
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(500)
  })
})
