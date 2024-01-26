import { UserEntity } from '../../../../domain/entities/User'
import { UcOptions } from '../../../../domain/protocols/uc-options'
import { FindUserDto } from '../../../../domain/useCases/user/find-user'
import { PaginatedResult, Repository } from '../repository'

export interface FindUserRepository extends Repository {
  findOne: (data: FindUserDto, opts?: UcOptions, strictEmail?: boolean) => Promise<UserEntity>
  findAll: (data: FindUserDto, opts?: UcOptions) => Promise<PaginatedResult<UserEntity[]>>
}
