import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { api } from '@/service/api'

export async function getTotalCards() {
  try {
    const response = await api.get<TransactionDataTypes[]>('/transactions')

    const totalIncomingTransactions = response.data.reduce(
      (acc, transaction) => {
        if (transaction.type === 'deposit') {
          return acc + transaction.amount
        }
        return acc
      },
      0
    )

    const totalOutgoingTransactions = response.data.reduce(
      (acc, transaction) => {
        if (transaction.type === 'withdrawn') {
          return acc + transaction.amount
        }
        return acc
      },
      0
    )

    const totalTransactions = response.data.reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)

    return {
      totalIncomingTransactions,
      totalOutgoingTransactions,
      totalTransactions
    }
  } catch (error) {
    throw new Error('Error to get transactions')
  }
}
