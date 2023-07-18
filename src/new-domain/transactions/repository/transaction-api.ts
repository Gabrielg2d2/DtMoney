import { HttpClient } from '../infra/HttpClient'
import { ITransactionRepository } from './repository-interface-transaction'

export class TransactionRepository implements ITransactionRepository {
  async create(transaction: any) {
    const httpClient = new HttpClient()
    await httpClient.post('/transactions', transaction)
  }
}
