import {
  Transaction,
  TransactionDataTypes
} from '@/entity/Transaction/Transaction'

type CreateTransactionAPI = (transaction: Transaction) => Promise<boolean>

export class CreateTransaction {
  constructor(
    private readonly transaction: TransactionDataTypes,
    private readonly createTransactionApi: CreateTransactionAPI
  ) {}

  async execute() {
    const transaction = new Transaction(
      this.transaction.id,
      this.transaction.amount,
      this.transaction.date,
      this.transaction.description,
      this.transaction.type
    )

    return await this.createTransactionApi(transaction)
  }
}
