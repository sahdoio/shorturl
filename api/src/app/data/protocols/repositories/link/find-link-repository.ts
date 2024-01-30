import { PaginatedResult, Repository } from '../repository'
import { LinkEntity } from '../../../../domain/entities/Link'
import { UcOptions } from '../../../../domain/protocols/uc-options'

export interface FindLinkRepositoryDto {
  id?: number
  url?: string
  urlHash?: string
  pageViews?: string
}

export interface FindLinkRepository extends Repository {
  findOne: (data: FindLinkRepositoryDto, strictEmail?: boolean) => Promise<LinkEntity>
  findAll: (data: FindLinkRepositoryDto, opts?: UcOptions) => Promise<PaginatedResult<LinkEntity[]>>
}
