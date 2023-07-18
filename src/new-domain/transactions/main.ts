import { CreateTransaction } from './create-transaction/create-transaction'
import { TransactionRepository } from './repository/transaction-api'
import { TransactionObjectValueType } from './types/transaction-object-value'

export class MainTransaction {
  get allData() {
    return {
      listTransactions: [],
      cards: {
        total: 0,
        withdrawn: 0,
        deposit: 0
      }
    }
  }

  async createNewTransaction(transaction: TransactionObjectValueType) {
    const createTransaction = new CreateTransaction()
    const result = createTransaction.execute(transaction)
    if (result) {
      const repository = new TransactionRepository()
      await repository.create(result)
    }
    throw new Error('Error to create new transaction')
  }
}
