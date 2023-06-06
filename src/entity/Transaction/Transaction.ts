type TransactionType = 'withdrawn' | 'deposit'

export class Transaction {
  private readonly id: string | null
  private readonly amount: number
  private readonly date: Date
  private readonly description: string
  private readonly type: TransactionType

  constructor(
    id: string | null,
    amount: number,
    date: Date,
    description: string,
    type: TransactionType
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
      this.type &&
      this.date instanceof Date
    )
  }

  public getId(): string | null {
    return this.id
  }

  public getAmount(): number {
    return this.amount
  }

  public getDate(): Date {
    return this.date
  }

  public getDescription(): string {
    return this.description
  }

  public getType(): TransactionType {
    return this.type
  }
}
