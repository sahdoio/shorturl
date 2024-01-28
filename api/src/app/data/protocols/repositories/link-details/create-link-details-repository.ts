import { Repository } from '../repository'
import { LinkDetailsEntity } from '../../../../domain/entities/LinkDetails'

export interface CreateLinkDetailsRepositoryDto {
  linkId: number
  url: string
  name: string
  value: string
}

export interface CreateLinkDetailsRepository extends Repository {
  exec: (data: CreateLinkDetailsRepositoryDto) => Promise<LinkDetailsEntity>
}
