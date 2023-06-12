import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { api } from '@/service/api'

export async function updateTransaction(transaction: TransactionDataTypes) {
  try {
    const response = await api.put(
      `/transactions/${transaction.id}`,
      transaction
    )
    return response.data
  } catch (error) {
    throw new Error('Error to update transaction')
  }
}
