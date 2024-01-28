import { Result } from '../../../domain/protocols/result'
import { ok } from '../../helpers/result'
import { Internationalization } from '../../protocols/utils/internationalization'
import { FindLinkRepository } from '../../protocols/repositories/link/find-link-repository'
import { TopTrendingUc } from '../../../domain/useCases/trending/top-trending'
import { UcOptions } from '../../../domain/protocols/uc-options'
import { PaginatedResult } from '../../protocols/repositories/repository'
import { LinkEntity } from '../../../domain/entities/Link'

export class TopTrending implements TopTrendingUc {
  constructor(
    private readonly i18n: Internationalization,
    private readonly findLinkRepository: FindLinkRepository
  ) {}

  async exec(): Promise<Result<PaginatedResult<LinkEntity[]>>> {
    const opts: UcOptions = { itemsPerPage: 100, orderBy: ['pageViews', 'id'], isOrderByDesc: true }
    const result = await this.findLinkRepository.findAll({}, opts)
    return ok(this.i18n.t('TOP_TRENDING_EXECUTED_SUCCESSFULLY'), result)
  }
}
