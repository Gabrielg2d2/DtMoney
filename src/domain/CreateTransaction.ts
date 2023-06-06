export class CreateTransaction {
  private readonly amount: number
  private readonly date: Date
  private readonly description: string
  private readonly type: string

  constructor(amount: number, date: Date, description: string, type: string) {
    this.amount = amount
    this.date = date
    this.description = description
    this.type = type
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

  public getType(): string {
    return this.type
  }
}
