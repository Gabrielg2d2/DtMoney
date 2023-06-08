import { TransactionDataTypes } from '@/entity/Transaction/Transaction'
import { api } from '@/service/api'

export async function createTransaction(transaction: TransactionDataTypes) {
  try {
    const response = await api.post('/transactions', transaction)
    return response.data
  } catch (error) {
    throw new Error('Error to create transaction')
  }
}
