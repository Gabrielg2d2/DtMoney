import { TransactionRepository } from './repository/repository'
import { CreateTransaction } from './sub/create-transaction/create-transaction'
import { DeleteTransaction } from './sub/delete-transaction/delete-transaction'
import { ListTransaction } from './sub/list-transaction/list-transaction'
import { UpdateTransaction } from './sub/update-transaction/update-transaction'
import { TransactionACLType } from './types/transaction-acl'
import { TransactionEntityType } from './types/transaction-entity'
import { TransactionObjectValueType } from './types/transaction-object-value'

export class MainTransaction {
  private dataTransactions: TransactionACLType[] = []
  private readonly cards = {
    total: 0,
    withdrawn: 0,
    deposit: 0
  }

  constructor(private readonly repository = new TransactionRepository()) {}

  get allData() {
    return {
      listTransactions: this.dataTransactions,
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

  async updateTransaction(transactionEntity: TransactionEntityType) {
    const updateTransaction = new UpdateTransaction()
    const transaction = updateTransaction.execute(transactionEntity)
    if (transaction) {
      await this.repository.update(transaction)
    }
  }

  async deleteTransaction(transactionEntity: TransactionEntityType) {
    const deleteTransaction = new DeleteTransaction()
    const transaction = deleteTransaction.execute(transactionEntity)
    if (transaction) {
      await this.repository.delete(transaction)
    }
  }

  async listTransactions(language = 'pt-br') {
    const allTransactions = await this.repository.list()
    if (allTransactions) {
      const list = new ListTransaction()
      const transactionsFormatted = list.execute(allTransactions, language)
      this.dataTransactions = transactionsFormatted
    }
  }
}
