import { TransactionDataAPI } from '../../../../domain/transaction/types/global/transactions'
import { ITotalIncomingTransactions } from '../../../../domain/transaction/use-cases/total-incoming-transactions'

export class TotalIncomingTransactions implements ITotalIncomingTransactions {
  filterTotalIncomingTransactions(transactions: TransactionDataAPI[]) {
    const total = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + transaction.amount
      }

      return acc
    }, 0)

    return total
  }
}
