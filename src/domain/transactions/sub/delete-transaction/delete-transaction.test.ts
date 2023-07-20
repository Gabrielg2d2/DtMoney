import { DeleteTransaction } from './delete-transaction'

describe('DeleteTransaction', () => {
  test('should return id if valid', async () => {
    const deleteTransaction = new DeleteTransaction()
    const transactionId = '1'

    const transaction = deleteTransaction.execute(transactionId)
    expect(transaction).toEqual('1')
  })

  test('should throw error if invalid', () => {
    const deleteTransaction = new DeleteTransaction()
    const transactionId = ''
    expect(() => deleteTransaction.execute(transactionId)).toThrowError()
  })
})
