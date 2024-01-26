import { Result } from '../../protocols/result'
import { UserEntity } from '../../entities/User'
import { UcOptions } from '../../protocols/uc-options'

export interface LoginResponseDto {
  user?: UserEntity
  accessToken?: string
}

export interface LoginUc {
  exec: (email: string, password: string, ucOptions?: UcOptions) => Promise<Result<LoginResponseDto>>
}
