import { TransactionObjectValueType } from '../types/transaction-object-value'

export interface ITransactionRepository {
  create: (transaction: TransactionObjectValueType) => Promise<void>
}
