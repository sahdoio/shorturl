import { Result } from '../../protocols/result'
import { PaginatedResult } from '../../../data/protocols/repositories/repository'
import { LinkEntity } from '../../entities/Link'

export interface TopTrendingUc {
  exec: () => Promise<Result<PaginatedResult<LinkEntity[]>>>
}
