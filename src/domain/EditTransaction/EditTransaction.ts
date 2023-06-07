import {
  Transaction,
  TransactionDataTypes
} from '@/entity/Transaction/Transaction'

type EditTransactionAPI = (transaction: Transaction) => Promise<boolean>

export class EditTransaction {
  constructor(
    private readonly transaction: TransactionDataTypes,
    private readonly editTransactionApi: EditTransactionAPI
  ) {}

  async execute() {
    if (!this.transaction.id) {
      throw new Error('The ID is required to edit the transaction')
    }
    const transaction = new Transaction(
      this.transaction.id,
      this.transaction.amount,
      this.transaction.date,
      this.transaction.description,
      this.transaction.type
    )
    return await this.editTransactionApi(transaction)
  }
}
