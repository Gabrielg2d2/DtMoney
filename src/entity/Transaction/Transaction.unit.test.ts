/* eslint-disable no-new */
import { Transaction } from './Transaction'

describe('Transaction - create', () => {
  it('should create a valid transaction', () => {
    const transaction = new Transaction(
      null,
      100,
      new Date().toISOString(),
      'category',
      'deposit',
      'A valid transaction'
    ).create()

    expect(transaction).toBeDefined()
  })

  it('should create a valid with id transaction', () => {
    const transaction = new Transaction(
      null,
      100,
      new Date().toISOString(),
      'category',
      'deposit',
      'A valid transaction'
    ).create()

    expect(transaction).toBeDefined()
  })

  it('should return error, when the value is equal to zero or description is less than 3 letters', () => {
    expect(() => {
      new Transaction(
        null,
        0,
        new Date().toISOString(),
        'category',
        'deposit',
        'A valid transaction'
      ).create()
    }).toThrowError('Amount must be positive for input and negative for output')

    expect(() => {
      new Transaction(
        null,
        0,
        new Date().toISOString(),
        'category',
        'deposit',
        'A valid transaction'
      ).create()
    }).toThrowError('Amount must be positive for input and negative for output')
  })
})

describe('Transaction - update', () => {
  it('should update a valid transaction', () => {
    const transaction = new Transaction(
      '12345',
      100,
      new Date().toISOString(),
      'category',
      'deposit',
      'A valid transaction'
    ).update()

    expect(transaction).toBeDefined()
  })

  it('should perform the update even with a negative output value', () => {
    const transaction = new Transaction(
      '12345',
      -100,
      new Date().toISOString(),
      'category',
      'deposit',
      'A valid transaction'
    ).update()

    expect(transaction).toBeDefined()
  })

  it('should return error, when the value is equal to zero or description is less than 3 letters', () => {
    expect(() => {
      new Transaction(
        null,
        0,
        new Date().toISOString(),
        'category',
        'deposit',
        'A valid transaction'
      ).update()
    }).toThrowError('Amount must be positive for input and negative for output')

    expect(() => {
      new Transaction(
        null,
        0,
        new Date().toISOString(),
        'category',
        'deposit',
        'A valid transaction'
      ).update()
    }).toThrowError('Amount must be positive for input and negative for output')
  })
})
