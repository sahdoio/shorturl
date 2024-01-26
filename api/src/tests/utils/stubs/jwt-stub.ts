import { JWT } from '../../../app/data/protocols/auth/jwt'
import { JwtConfig } from '../../../app/data/protocols/auth/jwt-config'
import { Token } from '../../../app/domain/protocols/token'
import { tokenMock } from '../mocks/token-mock'

export class JwtStub implements JWT {
  sign(data: any, config: JwtConfig): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve('token')
    })
  }
  
  verify(token: string, key: string, ignoreExpiration?: boolean): Promise<Token> { 
    return new Promise((resolve, reject) => {
      resolve(tokenMock)
    })
  }
  
  decode(token: string): Promise<Token> { 
    return new Promise((resolve, reject) => {
      resolve(tokenMock)
    })
  }
}
