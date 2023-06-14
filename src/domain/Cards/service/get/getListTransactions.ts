import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { api } from '@/service/api'

export async function getTotalCards() {
  try {
    const response = await api.get<TransactionDataTypes[]>('/transactions')
    let totalIncomingTransactions = 0
    let totalOutgoingTransactions = 0

    response.data.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        totalIncomingTransactions += transaction.amount
      }
      if (transaction.type === 'withdrawn') {
        totalOutgoingTransactions -= transaction.amount
      }
      return acc
    }, 0)

    return {
      totalIncomingTransactions,
      totalOutgoingTransactions,
      totalTransactions: totalIncomingTransactions + totalOutgoingTransactions
    }
  } catch (error) {
    throw new Error('Error to get transactions')
  }
}
