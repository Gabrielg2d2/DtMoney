import { TransactionValueObject } from './transaction-value-object'

type TransactionObjectValueType = {
  amount: number
  date: string
  category: string
  type: string
  name: string
}

describe('TransactionValueObject', () => {
  test('should be true', () => {
    const transactionValueObject = new TransactionValueObject()
    const transaction: TransactionObjectValueType = {
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionObject(transaction)
    expect(result).toBe(true)
  })

  test('should be false', () => {
    const transactionValueObject = new TransactionValueObject()
    const transaction: TransactionObjectValueType = {
      amount: 0,
      date: '2021-01-01',
      category: 'category',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionObject(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid date', () => {
    const transactionValueObject = new TransactionValueObject()
    const transaction: TransactionObjectValueType = {
      amount: 0,
      date: '2021-01-0123',
      category: 'category',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionObject(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid category', () => {
    const transactionValueObject = new TransactionValueObject()
    const transaction: TransactionObjectValueType = {
      amount: 0,
      date: '2021-01-0123',
      category: 'ab',
      type: 'withdrawn',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionObject(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid type', () => {
    const transactionValueObject = new TransactionValueObject()
    const transaction: TransactionObjectValueType = {
      amount: 0,
      date: '2021-01-0123',
      category: 'ab',
      type: 'invalid',
      name: 'name'
    }

    const result = transactionValueObject.validateTransactionObject(transaction)
    expect(result).toBe(false)
  })

  test('should return false for invalid name', () => {
    const transactionValueObject = new TransactionValueObject()
    const transaction: TransactionObjectValueType = {
      amount: 0,
      date: '2021-01-0123',
      category: 'ab',
      type: 'invalid',
      name: 'ab'
    }

    const result = transactionValueObject.validateTransactionObject(transaction)
    expect(result).toBe(false)
  })
})
