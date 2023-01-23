import { IListTransactions } from '../../../../domain/transaction/use-cases/list-transactions'
import { ListTransactionsReturn } from '../../../../domain/transaction/use-cases/list-transactions/model'

export type MethodGetTransactions = (
  url: string
) => Promise<ListTransactionsReturn>

export class ListTransactions implements IListTransactions {
  constructor(
    private readonly url: string,
    private readonly methodGet: MethodGetTransactions
  ) {}

  async execute() {
    try {
      const response = await this.methodGet(this.url)

      return response
    } catch (error) {
      return {
        status: 500,
        data: []
      }
    }
  }
}
