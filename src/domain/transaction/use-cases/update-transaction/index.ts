import { TransactionData } from '../../types/global/transactions'
import { UpdateNewTransactionResult } from './model'

export type UpdateNewTransactionParams = TransactionData

export interface IUpdateNewTransaction {
  put: (data: UpdateNewTransactionParams) => Promise<UpdateNewTransactionResult>
}
