import { TransactionData } from '../../types/global/transactions'
import { AddNewTransactionReturn } from './model'

export type AddNewTransactionParams = TransactionData

export interface IAddNewTransaction {
  add: (data: AddNewTransactionParams) => Promise<AddNewTransactionReturn>
}
