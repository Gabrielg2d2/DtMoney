import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { HttpClient } from '@/infra/HttpClient'

export async function createTransaction(transaction: TransactionDataTypes) {
  try {
    const httpClient = new HttpClient()
    const response = await httpClient.post('/transactions', transaction)
    return response
  } catch (error) {
    throw new Error('Error to create transaction')
  }
}
