import { UpdateTransaction } from './update-transaction'

describe('UpdateTransaction', () => {
  test('should update transaction when receiving a entity', async () => {
    const transactionEntity = {
      id: '1',
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'deposit',
      name: 'name'
    }
    const updateTransaction = new UpdateTransaction()
    updateTransaction.execute(transactionEntity)
    expect(transactionEntity).toEqual({
      id: '1',
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'deposit',
      name: 'name'
    })
  })

  test('should throw error when receiving a entity with invalid type', () => {
    const transactionEntity = {
      id: '1',
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'invalid',
      name: 'name'
    }
    const updateTransaction = new UpdateTransaction()
    const result = updateTransaction.execute(transactionEntity)
    expect(result).toBeFalsy()
  })
})
