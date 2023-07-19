import { TransactionEntityType } from '../types/transaction-entity'
import { TransactionObjectValueType } from '../types/transaction-object-value'

export interface IRepository<
  IResponseCUD = Promise<void>,
  IResponseList = Promise<TransactionEntityType[]>
> {
  create: (transaction: TransactionObjectValueType) => IResponseCUD
  update: (transaction: TransactionEntityType) => IResponseCUD
  delete: (transactionId: string) => IResponseCUD
  list: () => IResponseList
}
