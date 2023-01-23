import {
  IUpdateNewTransaction,
  UpdateNewTransactionParams
} from '../../../../domain/transaction/use-cases/update-transaction'
import { UpdateNewTransactionResult } from '../../../../domain/transaction/use-cases/update-transaction/model'

type MethodPut = (
  url: string,
  body: UpdateNewTransactionParams
) => Promise<UpdateNewTransactionResult>

export class UpdateNewTransactions implements IUpdateNewTransaction {
  constructor(
    private readonly url: string,
    private readonly methodPut: MethodPut
  ) {}

  async put(body: UpdateNewTransactionParams) {
    try {
      const response = await this.methodPut(this.url, body)

      return response
    } catch (error) {
      return {
        status: 400,
        data: []
      }
    }
  }
}
