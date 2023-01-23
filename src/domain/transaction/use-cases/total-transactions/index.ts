import { TransactionDataAPI } from '../../types/global/transactions'

export interface ITotalTransactions {
  filterTotalTransactions: (transactions: TransactionDataAPI[]) => number
}
