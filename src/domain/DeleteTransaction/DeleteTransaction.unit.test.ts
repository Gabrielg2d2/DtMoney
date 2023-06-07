import { DeleteTransaction } from './DeleteTransaction'

describe('DeleteTransaction', () => {
  it('should throw an error if id is not provided', async () => {
    const deleteTransactionAPISpy = jest.fn()
    const deleteTransaction = new DeleteTransaction('', deleteTransactionAPISpy)
    await expect(deleteTransaction.execute()).rejects.toThrow(
      'Id delete is required'
    )
  })

  it('should return true if transaction is deleted', async () => {
    const deleteTransactionAPISpy = jest.fn().mockResolvedValue(true)
    const deleteTransaction = new DeleteTransaction(
      '1',
      deleteTransactionAPISpy
    )
    const result = await deleteTransaction.execute()
    expect(result).toBe(true)
  })

  it('should return false if transaction is not deleted', async () => {
    const deleteTransactionAPISpy = jest.fn().mockResolvedValue(false)
    const deleteTransaction = new DeleteTransaction(
      '1',
      deleteTransactionAPISpy
    )
    const result = await deleteTransaction.execute()
    expect(result).toBe(false)
  })
})
