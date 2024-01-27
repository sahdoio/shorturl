import { CreateUserDto } from '../../../../domain/useCases/user/create-user'
import { Repository } from '../repository'
import { LinkDetailsEntity } from '../../../../domain/entities/LinkDetails'

export interface CreateLinkDetailsRepository extends Repository {
  exec: (data: CreateUserDto) => Promise<LinkDetailsEntity>
}
