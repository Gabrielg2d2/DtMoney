import { MainTransaction } from './main'
import {
  responseTransactionsMock,
  dataTransactionsMock
} from '../../../mock/transactions'
import { cleanup } from '@testing-library/react'

describe('Transaction - List', () => {
  afterEach(() => {
    cleanup()
  })

  const mainTransaction = MainTransaction

  it('should spy on the handleListTransactions function, and inject the mock', async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleListTransactions')

    mainSpy.mockResolvedValueOnce(responseTransactionsMock)

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
          date: '2021-05-01T00:00:00.000Z',
          dateFormatted: '01/05/2021',
          amountFormatted: 'R$ 10,00'
        },
        {
          id: 'any_id2',
          name: 'any_name2',
          amount: 200,
          type: 'deposit',
          category: 'any_category2',
          date: '2021-05-01T00:00:00.000Z',
          dateFormatted: '01/05/2021',
          amountFormatted: 'R$ 200,00'
        }
      ],
      totalTransactions: 'R$ 190,00',
      totalIncomingTransactions: 'R$ 200,00',
      totalOutgoingTransactions: 'R$ 10,00'
    })
  })

  it('should call the function only once', async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleListTransactions')

    mainSpy.mockResolvedValueOnce(responseTransactionsMock)

    await mainTransaction.handleListTransactions()

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleListTransactions).toHaveBeenCalledTimes(1)
  })
})

describe('Transaction - Create', () => {
  afterEach(() => {
    cleanup()
  })

  const mainTransaction = MainTransaction

  it('should add a new transaction', async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleCreateTransaction')
    const { id, ...dataMock } = dataTransactionsMock[0]

    mainSpy.mockResolvedValueOnce({
      status: 201,
      data: dataTransactionsMock
    })

    const response = await mainTransaction.handleCreateTransaction(dataMock)

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleCreateTransaction).toHaveBeenCalledTimes(1)

    expect(mainSpy).toHaveBeenCalledWith({
      name: 'any_name',
      amount: 10,
      type: 'withdrawn',
      category: 'any_category',
      date: '2021-05-01T00:00:00.000Z',
      dateFormatted: '01/05/2021',
      amountFormatted: 'R$ 10,00'
    })

    expect(response.status).toEqual(201)
  })

  it('should error with status different 201', async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleCreateTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 400,
      data: dataTransactionsMock
    })

    const response = await mainTransaction.handleCreateTransaction(
      dataTransactionsMock[0]
    )

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleCreateTransaction).toHaveBeenCalledTimes(1)

    expect(response.status).toEqual(400)
  })

  it("should call the method 'handleListTransactions' after adding a new transaction", async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleCreateTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 201,
      data: dataTransactionsMock
    })

    const response = await mainTransaction.handleCreateTransaction(
      dataTransactionsMock[0]
    )

    expect(response.data[0]).toEqual({
      id: 'any_id',
      name: 'any_name',
      amount: 10,
      type: 'withdrawn',
      category: 'any_category',
      date: '2021-05-01T00:00:00.000Z',
      dateFormatted: '01/05/2021',
      amountFormatted: 'R$ 10,00'
    })

    expect(response.status).toEqual(201)
  })
})

describe('Transaction - Remove', () => {
  afterEach(() => {
    cleanup()
  })

  const mainTransaction = MainTransaction

  it('should delete a transaction', async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleDeleteTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 200
    })

    const response = await mainTransaction.handleDeleteTransaction('any_id')

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleDeleteTransaction).toHaveBeenCalledTimes(1)

    expect(response.status).toEqual(200)
  })

  it('it should return status 400 when any error occurs when deleting', async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleDeleteTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 400
    })

    const response = await mainTransaction.handleDeleteTransaction('any_id')

    expect(response.status).toEqual(400)
  })
})

describe('Transaction - Update', () => {
  const mainTransaction = MainTransaction

  it('should update a transaction', async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleUpdateTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 200,
      data: dataTransactionsMock
    })

    const response = await mainTransaction.handleUpdateTransaction(
      'any_id',
      dataTransactionsMock[0]
    )

    expect(mainSpy).toHaveBeenCalledTimes(1)
    expect(mainTransaction.handleUpdateTransaction).toHaveBeenCalledTimes(1)

    expect(response.status).toEqual(200)
  })

  it('should return status 400 when any error occurs when updating', async () => {
    const mainSpy = jest.spyOn(mainTransaction, 'handleUpdateTransaction')

    mainSpy.mockResolvedValueOnce({
      status: 400,
      data: []
    })

    const response = await mainTransaction.handleUpdateTransaction(
      'any_id',
      dataTransactionsMock[0]
    )

    expect(response.status).toEqual(400)
  })
})
