import { Token } from '../../../domain/protocols/token'
import { JwtConfig } from './jwt-config'

export interface JWT {
  sign: (data: any, config: JwtConfig) => Promise<string>
  verify: (token: string, key: string, ignoreExpiration?: boolean) => Promise<Token>
  decode: (token: string) => Promise<Token>
}
