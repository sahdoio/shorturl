import { Repository } from '../repository'
import { LinkEntity } from '../../../../domain/entities/Link'

export interface CreateLinkRepositoryDto {
  url: string
  urlHash: string
  pageViews?: number
}

export interface CreateLinkRepository extends Repository {
  exec: (data: CreateLinkRepositoryDto) => Promise<LinkEntity>
}
