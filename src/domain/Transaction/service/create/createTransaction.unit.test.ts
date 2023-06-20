import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { createTransaction } from './createTransaction'
import { HttpClient } from '@/infra/HttpClient'

describe('createTransaction', () => {
  let createTransactionStub: jest.SpyInstance

  beforeEach(() => {
    createTransactionStub = jest
      .spyOn(HttpClient.prototype, 'post')
      .mockResolvedValueOnce(Promise.resolve())
  })

  afterEach(() => {
    createTransactionStub.mockRestore()
  })

  it('should create a transaction', async () => {
    const transaction: TransactionDataTypes = {
      id: '1',
      amount: 100,
      type: 'deposit',
      category: 'Category title',
      name: 'Transaction title',
      date: '2021-01-01T00:00:00.000'
    }

    await createTransaction(transaction)

    expect(createTransactionStub).toHaveBeenCalledTimes(1)
    expect(createTransactionStub).toHaveBeenCalledWith(
      '/transactions',
      transaction
    )
  })

  it('should throw an error if create transaction fails', async () => {
    const transaction: TransactionDataTypes = {
      id: '1',
      amount: 100,
      type: 'deposit',
      category: 'Category title',
      name: 'Transaction title',
      date: '2021-01-01T00:00:00.000'
    }

    createTransactionStub.mockRejectedValue(new Error('Error to create'))
    await createTransaction(transaction)
    await expect(createTransactionStub).rejects.toThrow('Error to create')
  })
})
