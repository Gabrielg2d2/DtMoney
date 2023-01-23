import { IRemoveTransaction } from '../../../../domain/transaction/use-cases/remove-transaction'
import { RemoveTransactionResult } from '../../../../domain/transaction/use-cases/remove-transaction/model'

type MethodDeleteTransaction = (url: string) => Promise<RemoveTransactionResult>

export class RemoveTransaction implements IRemoveTransaction {
  constructor(
    private readonly methodDeleteTransaction: MethodDeleteTransaction
  ) {}

  async removeTransaction(url: string) {
    try {
      const response = await this.methodDeleteTransaction(url)
      return response
    } catch (error) {
      return {
        status: 400,
        data: []
      }
    }
  }
}
