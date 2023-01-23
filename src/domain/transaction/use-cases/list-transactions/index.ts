import { ListTransactionsReturn } from './model'

export interface IListTransactions {
  execute: () => Promise<ListTransactionsReturn>
}
