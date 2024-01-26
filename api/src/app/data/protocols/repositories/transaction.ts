export interface TransactionManager {
  open: () => Promise<any>
  commit: () => Promise<void>
  rollback: () => Promise<void>
}
