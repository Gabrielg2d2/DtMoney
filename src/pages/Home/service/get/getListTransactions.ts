import { TransactionDataTypes } from '@/entity/Transaction/Transaction'
import { api } from '@/service/api'

export async function getListTransactions() {
  try {
    const response = await api.get<TransactionDataTypes[]>('/transactions')
    return response.data
  } catch (error) {
    throw new Error('Error to get transactions')
  }
}
