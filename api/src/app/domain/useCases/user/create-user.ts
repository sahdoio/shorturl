import { UserEntity } from '../../entities/User'
import { Result } from '../../protocols/result'

export interface CreateUserDto {
  email: string
  firstName?: string
  lastName?: string
  phoneNumber: string
  password: string
}

export interface CreateUserUc {
  exec: (user: CreateUserDto) => Promise<Result<UserEntity>>
}
