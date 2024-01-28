import { Repository } from '../repository'
import { LinkEntity } from '../../../../domain/entities/Link'

export interface UpdateLinkRepositoryDto {
  url?: string
  urlHash?: string
  pageViews?: number
}

export interface UpdateLinkRepository extends Repository {
  exec: (id: number, data: UpdateLinkRepositoryDto) => Promise<LinkEntity>
}
