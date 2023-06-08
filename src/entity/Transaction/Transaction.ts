type TransactionType = 'withdrawn' | 'deposit'
export type TransactionDataTypes = {
  id?: string
  amount: number
  date: string
  category: string
  type: TransactionType
  name: string
}

export class Transaction {
  constructor(
    private readonly id: string,
    private readonly amount: number,
    private readonly date: string,
    private readonly category: string,
    private readonly type: TransactionType,
    private readonly name: string
  ) {
    if (!this.verifyCreateTransaction()) {
      throw new Error('Invalid transaction')
    }
  }

  verifyCreateTransaction(): boolean {
    return (
      this.amount > 0 && this.category.length > 2 && !!this.type && !!this.date
    )
  }

  execute(): TransactionDataTypes {
    return {
      id: this.id,
      amount: this.amount,
      date: this.date,
      category: this.category,
      type: this.type,
      name: this.name
    }
  }
}
