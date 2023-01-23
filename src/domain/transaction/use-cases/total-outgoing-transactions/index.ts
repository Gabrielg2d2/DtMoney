import { TransactionDataAPI } from '../../types/global/transactions'

export interface ITotalOutgoingTransactions {
  filterTotalOutgoingTransactions: (
    transactions: TransactionDataAPI[]
  ) => number
}
