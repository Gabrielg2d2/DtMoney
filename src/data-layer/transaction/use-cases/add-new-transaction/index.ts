import {
  AddNewTransactionParams,
  IAddNewTransaction
} from '../../../../domain/transaction/use-cases/add-new-transaction'
import { AddNewTransactionReturn } from '../../../../domain/transaction/use-cases/add-new-transaction/model'

type MethodPost = (
  url: string,
  body: AddNewTransactionParams
) => Promise<AddNewTransactionReturn>

export class AddNewTransaction implements IAddNewTransaction {
  constructor(
    private readonly url: string,
    private readonly methodPost: MethodPost
  ) {}

  async add(body: AddNewTransactionParams) {
    try {
      const response = await this.methodPost(this.url, body)

      return response
    } catch (error) {
      return {
        status: 400
      }
    }
  }
}
