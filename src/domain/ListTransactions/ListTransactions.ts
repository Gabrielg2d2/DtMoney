import { TransactionDataTypes } from '@/entity/Transaction/Transaction'

type ListTransactionsAPI = () => Promise<TransactionDataTypes[]>

export class ListTransactions {
  constructor(private readonly listTransactionsApi: ListTransactionsAPI) {}

  async execute() {
    return await this.listTransactionsApi()
  }
}
