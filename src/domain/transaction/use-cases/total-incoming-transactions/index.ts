import { TransactionDataAPI } from '../../types/global/transactions'

export interface ITotalIncomingTransactions {
  filterTotalIncomingTransactions: (
    transactions: TransactionDataAPI[]
  ) => number
}
