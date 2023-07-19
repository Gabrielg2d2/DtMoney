import { TransactionEntity } from './transaction-entity'

type TransactionType = {
  id: string
  amount: number
  date: string
  category: string
  type: string
  name: string
}

describe('TransactionEntity', () => {
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
