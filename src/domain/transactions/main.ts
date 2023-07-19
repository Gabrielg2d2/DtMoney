import { LANGUAGE_PT_BR } from '../constant/constant'
import { TransactionRepository } from './repository/repository-api'
import { serviceCards } from './service/cards'
import { CreateTransaction } from './sub/create-transaction/create-transaction'
import { DeleteTransaction } from './sub/delete-transaction/delete-transaction'
import { ListTransaction } from './sub/list-transaction/list-transaction'
import { UpdateTransaction } from './sub/update-transaction/update-transaction'
import { TransactionACLType } from './types/transaction-acl'
import { TransactionEntityType } from './types/transaction-entity'
import { TransactionObjectValueType } from './types/transaction-object-value'

export class MainTransaction {
  private dataTransactions: TransactionACLType[] = []
  private cards = {
    total: 'R$ 0,00',
    income: 'R$ 0,00',
    outcome: 'R$ 0,00'
  }

  constructor(private readonly repository = new TransactionRepository()) {}

  get allData() {
    return {
      listTransactions: this.dataTransactions,
      cards: this.cards
    }
  }

  async listTransactions(language = LANGUAGE_PT_BR) {
    const allTransactions = await this.repository.list()
    if (allTransactions) {
      const list = new ListTransaction()
      const transactionsFormatted = list.execute(allTransactions, language)
      this.dataTransactions = transactionsFormatted
      const currentCards = serviceCards.calcCards(allTransactions)
      this.cards = currentCards
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
