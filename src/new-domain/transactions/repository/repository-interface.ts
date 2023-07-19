import { TransactionEntityType } from '../types/transaction-entity'
import { TransactionObjectValueType } from '../types/transaction-object-value'

export interface ITransactionRepository {
  create: (transaction: TransactionObjectValueType) => Promise<void>
  update: (transaction: TransactionEntityType) => Promise<void>
  delete: (transactionId: string) => Promise<void>
  list: () => Promise<TransactionEntityType[]>
}
