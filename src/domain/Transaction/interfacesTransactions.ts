import { TransactionDataTypes } from '@/entity/Transaction/Transaction'

export type CreateType = (transaction: TransactionDataTypes) => Promise<boolean>
export type DeleteType = (id: string) => Promise<boolean>
export type UpdateType = (transaction: TransactionDataTypes) => Promise<boolean>
export type ListType = () => Promise<TransactionDataTypes[]>

export interface ITransaction {
  list: (getTransactionListApi: ListType) => Promise<TransactionDataTypes[]>
  create: (
    transaction: TransactionDataTypes,
    createTransactionApi: CreateType
  ) => Promise<void>
  delete: (id: string, deleteTransactionApi: DeleteType) => Promise<void>
  update: (
    transaction: TransactionDataTypes,
    updateTransactionApi: UpdateType
  ) => Promise<void>
  getList: any
}
