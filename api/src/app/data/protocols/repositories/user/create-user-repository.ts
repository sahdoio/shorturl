import { CreateUserDto } from '../../../../domain/useCases/user/create-user'
import { UserEntity } from '../../../../domain/entities/User'
import { Repository } from '../repository'

export interface CreateUserRepository extends Repository {
  exec: (data: CreateUserDto) => Promise<UserEntity>
}
