/* istanbul ignore file */

import { TransactionManager } from '../../../app/data/protocols/repositories/transaction'

export class TransactionStub implements TransactionManager {
  async open (): Promise<any> {
    return {}
  }

  async commit (): Promise<void> {
    /** */
  }

  async rollback (): Promise<void> {
    /** */
  }
}
