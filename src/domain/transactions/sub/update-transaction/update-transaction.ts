import { TransactionEntity } from '../../entity/transaction-entity/transaction-entity'
import { TransactionEntityType } from '../../types/transaction-entity'

export class UpdateTransaction {
  execute(transaction: TransactionEntityType) {
    const transactionEntity = new TransactionEntity()
    const isValid = transactionEntity.validateTransactionEntity(transaction)

    if (!isValid) return false
    return transaction
  }
}
