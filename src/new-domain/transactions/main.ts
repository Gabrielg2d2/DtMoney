import { CreateTransaction } from './create-transaction/create-transaction'
import { TransactionRepository } from './repository/transaction-api'
import { TransactionObjectValueType } from './types/transaction-object-value'

export class MainTransaction {
  private readonly listTransactions = []
  private readonly cards = {
    total: 0,
    withdrawn: 0,
    deposit: 0
  }

  constructor(private readonly repository = new TransactionRepository()) {}

  get allData() {
    return {
      listTransactions: this.listTransactions,
      cards: this.cards
    }
  }

  async createNewTransaction(transactionOBV: TransactionObjectValueType) {
    const createTransaction = new CreateTransaction()
    const transaction = createTransaction.execute(transactionOBV)
    if (transaction) {
      await this.repository.create(transaction)
    }
  }
}
