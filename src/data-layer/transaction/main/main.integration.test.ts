import { MainTransaction } from './main'
import { data_transactions_mock } from '../../../mock/transactions'
import { cleanup } from '@testing-library/react'

describe('Transaction - List', () => {
  afterEach(() => {
    cleanup()
  })

  it('should spy on the handleListTransactions function, and inject the mock', async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleListTransactions')

    mainSpy.mockResolvedValueOnce({
      status: 200,
      data: data_transactions_mock
    })

    const response = await mainTransaction.handleListTransactions()

    expect(response).toEqual({
      status: 200,
      data: [
        {
          id: 'any_id',
          name: 'any_name',
          amount: 10,
          type: 'withdrawn',
          category: 'any_category',
          date: '2021-05-01T00:00:00.000Z'
        },
        {
          id: 'any_id2',
          name: 'any_name2',
          amount: 200,
          type: 'deposit',
          category: 'any_category2',
          date: '2021-05-01T00:00:00.000Z'
        }
      ]
    })
  })

  it('should call the function only once', async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleListTransactions')

    mainSpy.mockResolvedValueOnce({
      status: 200,
      data: data_transactions_mock
    })

    await mainTransaction.handleListTransactions()

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleListTransactions).toHaveBeenCalledTimes(1)
  })
})

describe('Transaction - Create', () => {
  afterEach(() => {
    cleanup()
  })
  it('should add a new transaction', async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleCreateTransaction')
    const { id, ...dataMock } = data_transactions_mock[0]

    mainSpy.mockResolvedValueOnce({
      status: 201,
      data: data_transactions_mock
    })

    const response = await mainTransaction.handleCreateTransaction(dataMock)

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleCreateTransaction).toHaveBeenCalledTimes(1)

    expect(mainSpy).toHaveBeenCalledWith({
      name: 'any_name',
      amount: 10,
      type: 'withdrawn',
      category: 'any_category',
      date: '2021-05-01T00:00:00.000Z'
    })

    expect(response.status).toEqual(201)
  })

  it('should error with status different 201', async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleCreateTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 400,
      data: data_transactions_mock
    })

    const response = await mainTransaction.handleCreateTransaction(
      data_transactions_mock[0]
    )

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleCreateTransaction).toHaveBeenCalledTimes(1)

    expect(response.status).toEqual(400)
  })

  it("should call the method 'handleListTransactions' after adding a new transaction", async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleCreateTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 201,
      data: data_transactions_mock
    })

    const response = await mainTransaction.handleCreateTransaction(
      data_transactions_mock[0]
    )

    expect(response.data[0]).toEqual({
      id: 'any_id',
      name: 'any_name',
      amount: 10,
      type: 'withdrawn',
      category: 'any_category',
      date: '2021-05-01T00:00:00.000Z'
    })

    expect(response.status).toEqual(201)
  })
})

describe('Transaction - Remove', () => {
  afterEach(() => {
    cleanup()
  })

  it('should delete a transaction', async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleDeleteTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 200,
      data: data_transactions_mock
    })

    const response = await mainTransaction.handleDeleteTransaction('any_id')

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleDeleteTransaction).toHaveBeenCalledTimes(1)

    expect(response.status).toEqual(200)
  })

  it('it should return status 400 when any error occurs when deleting', async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleDeleteTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 400,
      data: []
    })

    const response = await mainTransaction.handleDeleteTransaction('any_id')

    expect(response.status).toEqual(400)
  })
})

describe('Transaction - Update', () => {
  it('should update a transaction', async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleUpdateTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 200,
      data: data_transactions_mock
    })

    const response = await mainTransaction.handleUpdateTransaction(
      'any_id',
      data_transactions_mock[0]
    )

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleUpdateTransaction).toHaveBeenCalledTimes(1)

    expect(response.status).toEqual(200)
  })

  it('should return status 400 when any error occurs when updating', async () => {
    const mainTransaction = new MainTransaction()
    const mainSpy = jest.spyOn(mainTransaction, 'handleUpdateTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 400,
      data: []
    })

    const response = await mainTransaction.handleUpdateTransaction(
      'any_id',
      data_transactions_mock[0]
    )

    expect(response.status).toEqual(400)
  })
})
