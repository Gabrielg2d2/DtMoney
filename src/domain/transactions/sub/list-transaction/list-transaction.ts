import { TransactionEntity } from '../../entity/transaction-entity/transaction-entity'
import { TransactionEntityType } from '../../types/transaction-entity'

export class ListTransaction {
  execute(list: TransactionEntityType[], language: string) {
    const transactionEntity = new TransactionEntity()
    return list.map((transaction) =>
      transactionEntity.createTransactionEntity(transaction, language)
    )
  }
}
