import { Application } from '../../../../app'
import { ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { ShortenUrl } from '../../../../app/data/useCases/url/shorten-url'
import { ShortenUrlUc } from '../../../../app/domain/useCases/url/shorten-url'
import { CreateLinkRepositoryStub } from '../../../utils/stubs/repositories/links/create-link-repository-stub'
import { CreateLinkRepositoryDto } from '../../../../app/data/protocols/repositories/link/create-link-repository'
import { linkEntityMock } from '../../../utils/mocks/link/link-entity-mock'
import { QueueManagerStub } from '../../../utils/stubs/helpers/queue-manager-stub'
import { UrlShortenerStub } from '../../../utils/stubs/helpers/url-shortener-stub'
import env from '../../../../env'
import { SequelizeORM } from '../../../../app/implementations/database/sequelize'
import Config from '../../../../config/config'

interface SutTypes {
  sut: ShortenUrlUc
  i18nStub: Internationalization
  createLinkRepository: CreateLinkRepositoryStub
  createLinkRepositoryDto: CreateLinkRepositoryDto,
  urlShortener: UrlShortenerStub
}

const makeSut = (): SutTypes => {
  new Application(true)

  const createLinkRepositoryDto: CreateLinkRepositoryDto = {
    url: linkEntityMock.url,
    urlHash: linkEntityMock.urlHash,
    pageViews: linkEntityMock.pageViews,
  }
  const i18nStub = new I18nStub()
  const urlShortener = new UrlShortenerStub(env.APP_HOST);
  const queueManager = new QueueManagerStub()
  const createLinkRepository = new CreateLinkRepositoryStub()
  const sut = new ShortenUrl(
    i18nStub,
    urlShortener,
    queueManager,
    createLinkRepository
  )
  return {
    sut,
    i18nStub,
    createLinkRepository,
    createLinkRepositoryDto,
    urlShortener
  }
}

describe('ShortenUrl', () => {
  test('Should return 200 if shorten url process was executed successfully', async () => {
    const { sut, i18nStub, createLinkRepositoryDto, urlShortener } = makeSut()
    const res = await sut.exec(createLinkRepositoryDto)
    expect(res).toEqual(ok(i18nStub.t('SHORTENED_URL_SUCCESSFULLY'), urlShortener.exec(linkEntityMock.url).url))
  })
})
