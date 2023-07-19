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
    income: 0,
    outcome: 0
  }

  constructor(private readonly repository = new TransactionRepository()) {}

  get allData() {
    return {
      listTransactions: this.dataTransactions,
      cards: this.cards
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

  async createNewTransaction(transactionOBV: TransactionObjectValueType) {
    const createTransaction = new CreateTransaction()
    const transaction = createTransaction.execute(transactionOBV)
    if (transaction) {
      await this.repository.create(transaction)
    }
    await this.listTransactions()
  }

  async updateTransaction(transactionEntity: TransactionEntityType) {
    const updateTransaction = new UpdateTransaction()
    const transaction = updateTransaction.execute(transactionEntity)
    if (transaction) {
      await this.repository.update(transaction)
    }
    await this.listTransactions()
  }

  async deleteTransaction(id: string) {
    const deleteTransaction = new DeleteTransaction()
    const transactionId = deleteTransaction.execute(id)
    if (transactionId) {
      await this.repository.delete(transactionId)
    }
    await this.listTransactions()
  }
}
