import { TransactionDataAPI } from '../../../../domain/transaction/types/global/transactions'
import { ITotalTransactions } from '../../../../domain/transaction/use-cases/total-transactions'

export class TotalTransactions implements ITotalTransactions {
  filterTotalIncomingTransactions(transactions: TransactionDataAPI[]) {
    const total = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + transaction.amount
      }

      return acc
    }, 0)

    return total
  }

  filterTotalOutgoingTransactions(transactions: TransactionDataAPI[]) {
    const total = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'withdrawn') {
        return acc + transaction.amount
      }

      return acc
    }, 0)

    return total
  }

  filterTotalTransactions(transactions: TransactionDataAPI[]) {
    const total =
      this.filterTotalIncomingTransactions(transactions) -
      this.filterTotalOutgoingTransactions(transactions)

    return total
  }
}
