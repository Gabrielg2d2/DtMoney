import { CreateTransaction } from './create-transaction'

describe('CreateTransaction', () => {
  test('should generate a new transaction when receiving a value object', async () => {
    const createTransaction = new CreateTransaction()
    const transactionOBV = {
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'deposit',
      name: 'name'
    }

    const transaction = await createTransaction.execute(transactionOBV)
    expect(transaction).toEqual({
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'deposit',
      name: 'name'
    })
  })

  test('should throw error when receiving a value object with invalid type', () => {
    const createTransaction = new CreateTransaction()
    const transactionOBV = {
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'invalid',
      name: 'name'
    }
    const result = createTransaction.execute(transactionOBV)
    expect(result).toBeFalsy()
  })
})
