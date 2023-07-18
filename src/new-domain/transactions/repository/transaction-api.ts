import { HttpClient } from '../infra/HttpClient'
import { ITransactionRepository } from './repository-interface-transaction'

export class TransactionRepository implements ITransactionRepository {
  async create(transaction: any) {
    try {
      const httpClient = new HttpClient()
      await httpClient.post('/transactions', transaction)
    } catch (error) {
      throw new Error('Error to create new transaction repository')
    }
  }
}
