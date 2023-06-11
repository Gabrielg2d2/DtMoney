import { AdapterZodTransaction } from './AdapterZodTransaction'

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
  ) {}

  verifyNewTransaction(): boolean {
    if (this.amount === 0) {
      throw new Error(
        'Amount must be positive for input and negative for output'
      )
    }
    const adapterZodTransaction = new AdapterZodTransaction()
    const validationResult = adapterZodTransaction.validateNewTransaction({
      amount: this.amount,
      date: this.date,
      category: this.category,
      type: this.type,
      name: this.name
    })

    if (!validationResult) {
      throw new Error('Invalid new transaction')
    }

    return true
  }

  create(): TransactionDataTypes {
    if (!this.verifyNewTransaction()) return
    return {
      id: this.id,
      amount: this.amount,
      date: this.date,
      category: this.category,
      type: this.type,
      name: this.name
    }
  }

  update(): TransactionDataTypes {
    if (!this.id) throw new Error('Id is required to update')
    if (!this.verifyNewTransaction()) return
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
