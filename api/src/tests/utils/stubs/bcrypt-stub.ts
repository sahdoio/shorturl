import { Encrypter } from '../../../app/data/protocols/utils/encrypter'

export class BcryptStub implements Encrypter {
  encrypt(plain: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(plain)
    })
  }

  compare(plain: string, encrypted: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (plain === encrypted) 
        resolve(true)
      else 
        resolve(false)
    })
  }
}
