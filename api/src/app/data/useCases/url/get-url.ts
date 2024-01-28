import { Result } from '../../../domain/protocols/result'
import { notFound, ok } from '../../helpers/result'
import { Internationalization } from '../../protocols/utils/internationalization'
import { GetUrlDto, GetUrlUc } from '../../../domain/useCases/url/get-url'
import { FindLinkRepository } from '../../protocols/repositories/link/find-link-repository'
import { UpdateLinkRepository } from '../../protocols/repositories/link/update-link-repository'

export class GetUrl implements GetUrlUc {
  constructor (
    private readonly i18n: Internationalization,
    private readonly findLinkRepository: FindLinkRepository,
    private readonly updateLinkRepository: UpdateLinkRepository
  ) { }

  async exec (data: GetUrlDto): Promise<Result<string>> {
    const link = await this.findLinkRepository.findOne({ urlHash: data.hash })
    if (!link) {
      return notFound(this.i18n.t('NOT_FOUND'))
    }
    await this.updateLinkRepository.exec(link.id, { pageViews: link.pageViews + 1 })
    return ok(this.i18n.t('URL_FOUND_SUCCESSFULLY'), link.url)
  }
}
