import { TransactionEntity } from '../../entity/transaction-entity/transaction-entity'
import { TransactionACLType } from '../../types/transaction-acl'
import { TransactionEntityType } from '../../types/transaction-entity'

export class ListTransaction {
  private removeInvalidTransactions(list: TransactionACLType[]) {
    return list.filter((transaction) => transaction)
  }

  execute(list: TransactionEntityType[], language: string) {
    const transactionEntity = new TransactionEntity()
    const arrFormatted = list.map((transaction) =>
      transactionEntity.createTransactionEntity(transaction, language)
    )
    return this.removeInvalidTransactions(arrFormatted)
  }
}
