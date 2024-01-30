import { Application } from '../../../../app'
import { notFound, ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { linkEntityMock } from '../../../utils/mocks/link/link-entity-mock'
import { GetUrl } from '../../../../app/data/useCases/url/get-url'
import { DbFindLinkRepositoryStub } from '../../../utils/stubs/repositories/links/find-link-repository-stub'
import {
  FindLinkRepository,
  FindLinkRepositoryDto
} from '../../../../app/data/protocols/repositories/link/find-link-repository'
import { DbUpdateLinkRepositoryStub } from '../../../utils/stubs/repositories/links/update-link-repository-stub'
import { UrlShortenerStub } from '../../../utils/stubs/helpers/url-shortener-stub'
import env from '../../../../env'
import { GetUrlDto, GetUrlUc } from '../../../../app/domain/useCases/url/get-url'

interface SutTypes {
  sut: GetUrlUc
  i18nStub: Internationalization
  findLinkRepository: FindLinkRepository
  getUrlDto: GetUrlDto
}

const makeSut = (): SutTypes => {
  new Application(true)
  const urlShortener = new UrlShortenerStub(env.APP_HOST);
  const getUrlDto: GetUrlDto = {
    hash: urlShortener.exec(linkEntityMock.url).urlHash
  }
  const i18nStub = new I18nStub()
  const findLinkRepository = new DbFindLinkRepositoryStub()
  const updateLinkRepository = new DbUpdateLinkRepositoryStub()
  const sut = new GetUrl(i18nStub, findLinkRepository, updateLinkRepository)
  return {
    sut,
    i18nStub,
    findLinkRepository,
    getUrlDto
  }}

describe('GetUrl', () => {
  test('Should return 200 if get url was executed successfully', async () => {
    const { sut, i18nStub, getUrlDto } = makeSut()
    const res = await sut.exec(getUrlDto)
    expect(res).toEqual(ok(i18nStub.t('URL_FOUND_SUCCESSFULLY'), linkEntityMock.url))
  })

  test('Should return 404 trying to get url', async () => {
    const { sut, i18nStub, findLinkRepository, getUrlDto } = makeSut()
    // @ts-ignore
    await jest.spyOn(findLinkRepository, 'findOne').mockImplementationOnce(async () => null);
    const res = await sut.exec(getUrlDto)
    expect(res).toEqual(notFound(i18nStub.t('NOT_FOUND')))
  })
})
