import { Transaction, TransactionType } from '@/entity/Transaction/Transaction'

export class CreateTransaction {
  constructor(
    private readonly amount: number,
    private readonly date: string,
    private readonly description: string,
    private readonly type: TransactionType
  ) {
    this.amount = amount
    this.date = date
    this.description = description
    this.type = type
  }

  execute() {
    return new Transaction(
      null,
      this.amount,
      this.date,
      this.description,
      this.type
    )
  }
}
