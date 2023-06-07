import { TransactionDataTypes } from '@/entity/Transaction/Transaction'
import { CreateTransaction } from './CreateTransaction'

describe('CreateTransaction', () => {
  it('should create a transaction', async () => {
    const createTransactionAPISpy = jest.fn().mockResolvedValue(true)
    const transaction: TransactionDataTypes = {
      id: 'jest_id',
      amount: 100,
      date: '2021-01-01',
      description: 'jest_description',
      type: 'deposit'
    }
    const createTransaction = new CreateTransaction(
      transaction,
      createTransactionAPISpy
    )
    const response = await createTransaction.execute()
    expect(createTransactionAPISpy).toHaveBeenCalledWith(transaction)
    expect(response).toBe(true)
  })

  it('should throw an error if amount is not provided', async () => {
    const createTransactionAPISpy = jest.fn()
    const transaction: TransactionDataTypes = {
      id: 'jest_id',
      amount: 0,
      date: '2021-01-01',
      description: 'jest_description',
      type: 'deposit'
    }
    const createTransaction = new CreateTransaction(
      transaction,
      createTransactionAPISpy
    )
    await expect(createTransaction.execute()).rejects.toThrow(
      'Invalid transaction'
    )
  })
})
