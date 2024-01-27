import { PaginatedResult, Repository } from '../repository'
import { LinkEntity } from '../../../../domain/entities/Link'
import { UcOptions } from '../../../../domain/protocols/uc-options'

export interface FindLinkDto {
  id?: number
  url?: string
  urlHash?: string
  pageViews?: string
}

export interface FindLinkRepository extends Repository {
  findOne: (data: FindLinkDto, strictEmail?: boolean) => Promise<LinkEntity>
  findAll: (data: FindLinkDto, opts?: UcOptions) => Promise<PaginatedResult<LinkEntity[]>>
}
