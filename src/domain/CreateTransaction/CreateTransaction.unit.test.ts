import { CreateTransaction } from './CreateTransaction'

describe('CreateTransaction', () => {
  it('should create a transaction', () => {
    const createTransaction = new CreateTransaction(
      100,
      new Date('2020-01-01').toISOString(),
      'any_description',
      'deposit'
    )
    const transaction = createTransaction.execute()
    expect(transaction).toEqual({
      id: null,
      amount: 100,
      date: '2020-01-01T00:00:00.000Z',
      description: 'any_description',
      type: 'deposit'
    })
  })

  it('should not create a transaction with invalid amount', () => {
    const createTransaction = new CreateTransaction(
      0,
      new Date('2020-01-01').toISOString(),
      'any_description',
      'deposit'
    )
    expect(() => createTransaction.execute()).toThrowError(
      'Invalid transaction'
    )
  })
})
