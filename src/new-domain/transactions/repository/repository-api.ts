import { HttpClient } from '../infra/HttpClient'
import { TransactionEntityType } from '../types/transaction-entity'
import { TransactionObjectValueType } from '../types/transaction-object-value'
import { IRepository } from './repository-interface'

export class TransactionRepository implements IRepository {
  constructor(private readonly httpClient = new HttpClient()) {}

  async create(transaction: TransactionObjectValueType) {
    try {
      await this.httpClient.post('/transactions', transaction)
    } catch (error) {
      throw new Error('Error to create new transaction repository')
    }
  }

  async update(transaction: TransactionEntityType) {
    try {
      await this.httpClient.put(`/transactions/${transaction.id}`, transaction)
    } catch (error) {
      throw new Error('Error to update transaction repository')
    }
  }

  async delete(transactionId: string) {
    try {
      await this.httpClient.delete(`/transactions/${transactionId}`)
    } catch (error) {
      throw new Error('Error to delete transaction repository')
    }
  }

  async list() {
    try {
      const data = await this.httpClient.get<TransactionEntityType[]>(
        '/transactions'
      )
      return data
    } catch (error) {
      throw new Error('Error to list transactions repository')
    }
  }
}
