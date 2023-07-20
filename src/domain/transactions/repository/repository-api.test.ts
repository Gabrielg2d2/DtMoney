import { TransactionRepository } from './repository-api'

describe('TransactionRepository - success', () => {
  const httpClient = {
    post: jest.fn().mockResolvedValueOnce(Promise.resolve()),
    put: jest.fn().mockResolvedValueOnce(Promise.resolve()),
    delete: jest.fn().mockResolvedValueOnce(Promise.resolve()),
    get: jest.fn().mockResolvedValueOnce(Promise.resolve())
  }
  const repository = new TransactionRepository(httpClient as any)

  test('should create new transaction', async () => {
    const transactionOBV = {
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'income',
      name: 'name'
    }
    await repository.create(transactionOBV)
    expect(httpClient.post).toBeCalledWith('/transactions', transactionOBV)
    expect(httpClient.post).toBeCalledTimes(1)
  })

  test('should update transaction', async () => {
    const transactionEntity = {
      id: '1',
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'income',
      name: 'name'
    }
    await repository.update(transactionEntity)
    expect(httpClient.put).toBeCalledWith(
      `/transactions/${transactionEntity.id}`,
      transactionEntity
    )
    expect(httpClient.put).toBeCalledTimes(1)
  })

  test('should delete transaction', async () => {
    const transactionId = '1'
    await repository.delete(transactionId)
    expect(httpClient.delete).toBeCalledWith(`/transactions/${transactionId}`)
    expect(httpClient.delete).toBeCalledTimes(1)
  })

  test('should list transactions', async () => {
    await repository.list()
    expect(httpClient.get).toBeCalledWith('/transactions')
    expect(httpClient.get).toBeCalledTimes(1)
  })
})

describe('TransactionRepository - error', () => {
  const httpClient = {
    post: jest.fn().mockRejectedValueOnce(new Error()),
    put: jest.fn().mockRejectedValueOnce(new Error()),
    delete: jest.fn().mockRejectedValueOnce(new Error()),
    get: jest.fn().mockRejectedValueOnce(new Error())
  }
  const repository = new TransactionRepository(httpClient as any)

  test('should return an error when trying to create the transaction', async () => {
    const transactionOBV = {
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'income',
      name: 'name'
    }
    await expect(repository.create(transactionOBV)).rejects.toThrowError()
  })

  test('should return an error when trying to update the transaction', async () => {
    const transactionEntity = {
      id: '1',
      amount: 100,
      date: '2021-01-01',
      category: 'category',
      type: 'income',
      name: 'name'
    }
    await expect(repository.update(transactionEntity)).rejects.toThrowError()
  })

  test('should return an error when trying to delete the transaction', async () => {
    const transactionId = '1'
    await expect(repository.delete(transactionId)).rejects.toThrowError()
  })

  test('should return an error when trying to list the transactions', async () => {
    await expect(repository.list()).rejects.toThrowError()
  })
})
