import { TransactionEntityType } from '../../types/transaction-entity'

export class DeleteTransaction {
  execute(transaction: TransactionEntityType) {
    if (!transaction.id) {
      throw new Error(
        'Invalid transaction id to delete. Please check the values of the transaction id.'
      )
    }
    return transaction
  }
}
