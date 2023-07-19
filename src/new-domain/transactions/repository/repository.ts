import { HttpClient } from '../infra/HttpClient'
import { TransactionEntityType } from '../types/transaction-entity'
import { ITransactionRepository } from './repository-interface'

export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly persisted = new HttpClient()) {}

  async create(transaction: any) {
    try {
      await this.persisted.post('/transactions', transaction)
    } catch (error) {
      throw new Error('Error to create new transaction repository')
    }
  }

  async update(transaction: TransactionEntityType) {
    try {
      await this.persisted.put(`/transactions/${transaction.id}`, transaction)
    } catch (error) {
      throw new Error('Error to update transaction repository')
    }
  }

  async delete(transactionId: string) {
    try {
      await this.persisted.delete(`/transactions/${transactionId}`)
    } catch (error) {
      throw new Error('Error to delete transaction repository')
    }
  }

  async list() {
    try {
      const data = await this.persisted.get<TransactionEntityType[]>(
        '/transactions'
      )
      return data
    } catch (error) {
      throw new Error('Error to list transactions repository')
    }
  }
}
