/* istanbul ignore file */

import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/utils/encrypter'

export class Bcrypt implements Encrypter {
  private readonly salts: number = 10

  async encrypt (plain: string): Promise<string> {
    return bcrypt.hashSync(plain, this.salts)
  }

  async compare (plain: string, encrypted: string): Promise<boolean> {
    return bcrypt.compareSync(plain, encrypted)
  }
}
