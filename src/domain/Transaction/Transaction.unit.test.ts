import { Transaction } from './Transaction'

describe('Transaction - list', () => {
  it('should return a list of transactions', async () => {
    const getTransactionListApiSpy = jest.fn().mockResolvedValue([
      {
        id: '1',
        amount: 100,
        date: '2020-01-01',
        category: 'category',
        name: 'name',
        type: 'deposit'
      }
    ])
    const createTransactionApiSpy = jest.fn()
    const deleteTransactionApiSpy = jest.fn()
    const updateTransactionApiSpy = jest.fn()
    const transaction = new Transaction(
      getTransactionListApiSpy,
      createTransactionApiSpy,
      deleteTransactionApiSpy,
      updateTransactionApiSpy
    )
    const list = await transaction.list()

    expect(list).toEqual([
      {
        id: '1',
        amount: 100,
        date: '2020-01-01',
        category: 'category',
        name: 'name',
        type: 'deposit'
      }
    ])
  })
})

describe('Transaction - create', () => {
  it('should create a transaction', async () => {
    const getTransactionListApiSpy = jest.fn().mockResolvedValue([])
    const createTransactionApiSpy = jest.fn()
    const deleteTransactionApiSpy = jest.fn()
    const updateTransactionApiSpy = jest.fn()
    const transaction = new Transaction(
      getTransactionListApiSpy,
      createTransactionApiSpy,
      deleteTransactionApiSpy,
      updateTransactionApiSpy
    )
    await transaction.create({
      id: '1',
      amount: 100,
      date: '2020-01-01',
      category: 'category',
      name: 'name',
      type: 'deposit'
    })

    expect(createTransactionApiSpy).toHaveBeenCalledWith({
      id: '1',
      amount: 100,
      date: '2020-01-01',
      category: 'category',
      name: 'name',
      type: 'deposit'
    })
  })
})

describe('Transaction - delete', () => {
  it('should delete a transaction', async () => {
    const getTransactionListApiSpy = jest.fn().mockResolvedValue([])
    const createTransactionApiSpy = jest.fn()
    const deleteTransactionApiSpy = jest.fn()
    const updateTransactionApiSpy = jest.fn()
    const transaction = new Transaction(
      getTransactionListApiSpy,
      createTransactionApiSpy,
      deleteTransactionApiSpy,
      updateTransactionApiSpy
    )
    await transaction.delete('1')

    expect(deleteTransactionApiSpy).toHaveBeenCalledWith('1')
  })
})

describe('Transaction - update', () => {
  it('should update a transaction', async () => {
    const getTransactionListApiSpy = jest.fn().mockResolvedValue([])
    const createTransactionApiSpy = jest.fn()
    const deleteTransactionApiSpy = jest.fn()
    const updateTransactionApiSpy = jest.fn()
    const transaction = new Transaction(
      getTransactionListApiSpy,
      createTransactionApiSpy,
      deleteTransactionApiSpy,
      updateTransactionApiSpy
    )
    await transaction.update({
      id: '1',
      amount: 100,
      date: '2020-01-01',
      category: 'category',
      name: 'name',
      type: 'deposit'
    })

    expect(updateTransactionApiSpy).toHaveBeenCalledWith({
      id: '1',
      amount: 100,
      date: '2020-01-01',
      category: 'category',
      name: 'name',
      type: 'deposit'
    })
  })
})

describe('Transaction - getList', () => {
  it('should return a list of transactions', async () => {
    const getTransactionListApiSpy = jest.fn().mockResolvedValue([
      {
        id: '1',
        amount: 100,
        date: '2020-01-01',
        category: 'category',
        name: 'name',
        type: 'deposit'
      }
    ])
    const createTransactionApiSpy = jest.fn()
    const deleteTransactionApiSpy = jest.fn()
    const updateTransactionApiSpy = jest.fn()
    const transaction = new Transaction(
      getTransactionListApiSpy,
      createTransactionApiSpy,
      deleteTransactionApiSpy,
      updateTransactionApiSpy
    )
    await transaction.list()

    const list = transaction.getList

    expect(list).toEqual([
      {
        id: '1',
        amount: 100,
        date: '2020-01-01',
        category: 'category',
        name: 'name',
        type: 'deposit'
      }
    ])
  })
})
