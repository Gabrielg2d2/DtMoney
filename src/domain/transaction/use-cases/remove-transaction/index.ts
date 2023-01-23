import { RemoveTransactionResult } from './model'

export interface IRemoveTransaction {
  removeTransaction: (url: string) => Promise<RemoveTransactionResult>
}
