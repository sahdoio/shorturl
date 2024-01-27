import { LinkEntity } from '../../../domain/entities/Link'
import { Result } from '../../../domain/protocols/result'
import { ok } from '../../helpers/result'
import { CreateLinkRepository } from '../../protocols/repositories/link/create-link-repository'
import { Internationalization } from '../../protocols/utils/internationalization'
import { ShortenUrlDto, ShortenUrlUc } from '../../../domain/useCases/url/shorten-url'
import { IUrlShortener } from '../../protocols/utils/url-shotener'

export class ShortenUrl implements ShortenUrlUc {
  constructor (
    private readonly i18n: Internationalization,
    private readonly urlShortener: IUrlShortener,
    private readonly createLinkRepository: CreateLinkRepository
  ) { }

  async exec (data: ShortenUrlDto): Promise<Result<string>> {
    const { url } = data
    const shortUrl = this.urlShortener.exec(data.url)
    await this.createLinkRepository.exec({ url: data.url, urlHash: shortUrl.urlHash })
    return ok(this.i18n.t('SHORTENED_URL_SUCCESSFULLY'), shortUrl.url)
  }
}