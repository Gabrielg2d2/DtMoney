import { TransactionEntity } from './transaction-entity'

type TransactionType = {
  id: string
  amount: number
  date: string
  category: string
  type: string
  name: string
}

describe('TransactionEntity - validateTransactionEntity', () => {
  test('should be true', () => {
    const transactionValueObject = new TransactionEntity()
    const transaction: TransactionType = {
      id: 'id123456',
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionEntity(transaction)
    expect(result).toBe(true)
  })

  test('should be false', () => {
    const transactionValueObject = new TransactionEntity()
    const transaction: TransactionType = {
      id: 'id123456',
      amount: 0,
      date: '2021-01-01',
      category: 'category',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionEntity(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid id', () => {
    const transactionValueObject = new TransactionEntity()
    const transaction: TransactionType = {
      id: '',
      amount: 0,
      date: '2021-01-0123',
      category: 'category',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionEntity(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid date', () => {
    const transactionValueObject = new TransactionEntity()
    const transaction: TransactionType = {
      id: 'id123456',
      amount: 100,
      date: null,
      category: 'category',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionEntity(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid category', () => {
    const transactionValueObject = new TransactionEntity()
    const transaction: TransactionType = {
      id: 'id123456',
      amount: 10,
      date: '2021-01-01',
      category: 'ab',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionEntity(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid type', () => {
    const transactionValueObject = new TransactionEntity()
    const transaction: TransactionType = {
      id: 'id123456',
      amount: 20,
      date: '2021-01-01',
      category: 'category',
      type: 'invalid',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionEntity(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid name', () => {
    const transactionValueObject = new TransactionEntity()
    const transaction: TransactionType = {
      id: 'id123456',
      amount: 50,
      date: '2021-01-01',
      category: 'category',
      type: 'withdrawn',
      name: 'ab'
    }

    const result = transactionValueObject.validateTransactionEntity(transaction)
    expect(result).toBe(false)
  })
})

describe('TransactionEntity - createTransactionEntity', () => {
  test('should return transaction formatted', () => {
    const transactionFormatted = {
      id: 'id123456',
      amount: 100,
      amountFormatted: 'R$ 1,00',
      date: '2021-01-01T00:00:00.000Z',
      dateFormatted: '01/01/2021',
      category: 'category',
      type: 'withdrawn',
      name: 'name test'
    }

    const transaction = {
      id: 'id123456',
      amount: 100,
      date: '2021-01-01T00:00:00.000Z',
      category: 'category',
      type: 'withdrawn',
      name: 'name test'
    }

    const transactionValueObject = new TransactionEntity()
    const result = transactionValueObject.createTransactionEntity(transaction)
    expect(result).toEqual(transactionFormatted)
  })

  test('should return a error', () => {
    const transaction = {
      id: 'id123456',
      amount: 0,
      date: '2021-01-01T00:00:00.000Z',
      category: 'category',
      type: 'withdrawn',
      name: 'name test'
    }

    const transactionValueObject = new TransactionEntity()
    const result = transactionValueObject.createTransactionEntity(transaction)
    expect(result).toBeUndefined()
  })
})
