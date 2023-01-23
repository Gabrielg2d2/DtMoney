import { TransactionDataAPI } from '../../../../domain/transaction/types/global/transactions'
import { ITotalTransactions } from '../../../../domain/transaction/use-cases/total-transactions'

export class TotalTransactions implements ITotalTransactions {
  filterTotalTransactions(transactions: TransactionDataAPI[]) {
    const total = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)

    return total
  }
}
