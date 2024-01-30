import { Application } from '../../../../app'
import { ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { linkEntityMock } from '../../../utils/mocks/link/link-entity-mock'
import { DbFindLinkRepositoryStub } from '../../../utils/stubs/repositories/links/find-link-repository-stub'
import { FindLinkRepository } from '../../../../app/data/protocols/repositories/link/find-link-repository'
import { TopTrending } from '../../../../app/data/useCases/trendings/top-trending'
import { TopTrendingUc } from '../../../../app/domain/useCases/trending/top-trending'
import { repositoryMetadataMock } from '../../../utils/mocks/repository-metadata-mock'

interface SutTypes {
  sut: TopTrendingUc
  i18nStub: Internationalization
  findLinkRepository: FindLinkRepository
}

const makeSut = (): SutTypes => {
  new Application(true)
  const i18nStub = new I18nStub()
  const findLinkRepository = new DbFindLinkRepositoryStub()
  const sut = new TopTrending(i18nStub, findLinkRepository)
  return {
    sut,
    i18nStub,
    findLinkRepository
  }}

describe('TopTrending', () => {
  test('Should return 200 if top trending was executed successfully', async () => {
    const { sut, i18nStub } = makeSut()
    const res = await sut.exec()
    const expectedResult = {
      metadata: repositoryMetadataMock,
      payload: [linkEntityMock, linkEntityMock, linkEntityMock]
    }
    expect(res).toEqual(ok(i18nStub.t('TOP_TRENDING_EXECUTED_SUCCESSFULLY'), expectedResult))
  })
})
