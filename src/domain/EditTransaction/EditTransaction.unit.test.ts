import { TransactionDataTypes } from '@/entity/Transaction/Transaction'
import { EditTransaction } from './EditTransaction'

describe('EditTransaction', () => {
  it('should throw an error if id is not provided', async () => {
    const editTransactionAPISpy = jest.fn()
    const transaction: TransactionDataTypes = {
      id: null,
      amount: 100,
      date: '2021-01-01',
      description: 'any_description',
      type: 'deposit'
    }
    const editTransaction = new EditTransaction(
      transaction,
      editTransactionAPISpy
    )
    await expect(editTransaction.execute()).rejects.toThrow(
      'The ID is required to edit the transaction'
    )
  })

  it('should call editTransactionApi with correct params', async () => {
    const editTransactionAPISpy = jest.fn().mockResolvedValue(true)
    const transaction: TransactionDataTypes = {
      id: 'any_id',
      amount: 100,
      date: '2021-01-01',
      description: 'any_description',
      type: 'deposit'
    }
    const editTransaction = new EditTransaction(
      transaction,
      editTransactionAPISpy
    )
    await editTransaction.execute()
    expect(editTransactionAPISpy).toHaveBeenCalledWith(transaction)
  })
})
