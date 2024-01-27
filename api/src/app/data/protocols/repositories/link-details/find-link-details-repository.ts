import { UcOptions } from '../../../../domain/protocols/uc-options'
import { FindUserDto } from '../../../../domain/useCases/user/find-user'
import { PaginatedResult, Repository } from '../repository'
import { LinkDetailsEntity } from '../../../../domain/entities/LinkDetails'

export interface FindLinkDetailsRepository extends Repository {
  findOne: (data: FindUserDto, opts?: UcOptions, strictEmail?: boolean) => Promise<LinkDetailsEntity>
  findAll: (data: FindUserDto, opts?: UcOptions) => Promise<PaginatedResult<LinkDetailsEntity[]>>
}
