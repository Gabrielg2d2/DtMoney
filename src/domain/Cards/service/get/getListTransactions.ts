import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { HttpClient } from '@/infra/HttpClient'

function formatCards(arrTransactions: TransactionDataTypes[]) {
  let totalIncomingTransactions = 0
  let totalOutgoingTransactions = 0
  let totalTransactions = 0

  totalTransactions = arrTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      totalIncomingTransactions += transaction.amount
      return acc + transaction.amount
    }

    totalOutgoingTransactions -= transaction.amount
    return acc - transaction.amount
  }, 0)

  return {
    totalIncomingTransactions,
    totalOutgoingTransactions,
    totalTransactions
  }
}

export async function getTotalCards() {
  const httpClientGet = new HttpClient()
  const response = await httpClientGet.get<TransactionDataTypes[]>(
    '/transactions'
  )

  const {
    totalTransactions,
    totalIncomingTransactions,
    totalOutgoingTransactions
  } = formatCards(response)

  return {
    totalIncomingTransactions,
    totalOutgoingTransactions,
    totalTransactions
  }
}
