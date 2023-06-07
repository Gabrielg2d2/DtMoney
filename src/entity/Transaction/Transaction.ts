export type TransactionType = 'withdrawn' | 'deposit'
export type TransactionDataTypes = {
  id: string | null
  amount: number
  date: string
  description: string
  type: TransactionType
}

export class Transaction {
  constructor(
    private readonly id: string | null,
    private readonly amount: number,
    private readonly date: string,
    private readonly description: string,
    private readonly type: TransactionType
  ) {
    this.id = id
    this.amount = amount
    this.date = date
    this.description = description
    this.type = type

    if (!this.verifyCreateTransaction()) {
      throw new Error('Invalid transaction')
    }
  }

  verifyCreateTransaction(): boolean {
    return (
      this.amount > 0 &&
      this.description.length > 2 &&
      !!this.type &&
      !!this.date
    )
  }

  public getId(): string | null {
    return this.id
  }

  public getAmount(): number {
    return this.amount
  }

  public getDate(): string {
    return this.date
  }

  public getDescription(): string {
    return this.description
  }

  public getType(): TransactionType {
    return this.type
  }
}
