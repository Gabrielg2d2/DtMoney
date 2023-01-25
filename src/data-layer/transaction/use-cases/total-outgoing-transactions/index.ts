import { TransactionDataAPI } from '../../../../domain/transaction/types/global/transactions'
import { ITotalOutgoingTransactions } from '../../../../domain/transaction/use-cases/total-outgoing-transactions'

export class TotalOutgoingTransactions implements ITotalOutgoingTransactions {
  filterTotalOutgoingTransactions(transactions: TransactionDataAPI[]) {
    const total = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'withdrawn') {
        return acc + transaction.amount
      }

      return acc
    }, 0)

    return total
  }
}
