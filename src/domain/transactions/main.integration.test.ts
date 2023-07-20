import { MainTransaction } from './main'

describe('MainTransaction - initial values', () => {
  test('should return array empty', () => {
    const mainTransaction = new MainTransaction()
    const transactions = mainTransaction.allData.listTransactions
    expect(transactions).toEqual([])
  })

  test('should return cards all values', () => {
    const mainTransaction = new MainTransaction()
    const cards = mainTransaction.allData.cards
    expect(cards.total).toEqual('R$ 0,00')
    expect(cards.income).toEqual('R$ 0,00')
    expect(cards.outcome).toEqual('R$ 0,00')
  })
})

describe('MainTransaction - listTransactions', () => {
  test('should return array empty', async () => {
    const repository = {
      list: jest.fn().mockResolvedValueOnce([]),
      create: jest.fn().mockResolvedValueOnce({}),
      update: jest.fn().mockResolvedValueOnce({}),
      delete: jest.fn().mockResolvedValueOnce({})
    }
    const mainTransaction = new MainTransaction(repository as any)
    await mainTransaction.listTransactions()
    expect(mainTransaction.allData.listTransactions).toEqual([])
  })

  test('should return a position in array', async () => {
    const repository = {
      list: jest.fn().mockResolvedValueOnce([
        {
          id: '1',
          amount: 100,
          date: '2023-07-01',
          category: 'category',
          type: 'deposit',
          name: 'name'
        }
      ]),
      create: jest.fn().mockResolvedValueOnce({}),
      update: jest.fn().mockResolvedValueOnce({}),
      delete: jest.fn().mockResolvedValueOnce({})
    }
    const mainTransaction = new MainTransaction(repository as any)
    await mainTransaction.listTransactions()
    expect(mainTransaction.allData.listTransactions).toEqual([
      {
        id: '1',
        amount: 100,
        amountFormatted: 'R$ 1,00',
        date: '2023-07-01',
        dateFormatted: '01/07/2023',
        category: 'category',
        type: 'deposit',
        name: 'name'
      }
    ])
  })
})

describe('MainTransaction - createNewTransaction', () => {
  test('should register new transaction', async () => {
    const persistTransactions = []
    const repository = {
      list: jest.fn().mockResolvedValueOnce([]),
      create: jest.fn().mockImplementationOnce(() => {
        persistTransactions.push({
          id: '1',
          amount: 100,
          date: '2023-07-01',
          category: 'category',
          type: 'deposit',
          name: 'name'
        })
      }),
      update: jest.fn().mockResolvedValueOnce({}),
      delete: jest.fn().mockResolvedValueOnce({})
    }
    const mainTransaction = new MainTransaction(repository as any)
    await mainTransaction.createNewTransaction({
      amount: 100,
      date: '2023-07-01',
      category: 'category',
      type: 'deposit',
      name: 'name'
    })
    expect(persistTransactions).toEqual([
      {
        id: '1',
        amount: 100,
        date: '2023-07-01',
        category: 'category',
        type: 'deposit',
        name: 'name'
      }
    ])
  })

  test('should not create a new transaction', async () => {
    const persistTransactions = []
    const repository = {
      list: jest.fn().mockResolvedValueOnce([]),
      create: jest.fn().mockRejectedValueOnce(new Error()),
      update: jest.fn().mockResolvedValueOnce({}),
      delete: jest.fn().mockResolvedValueOnce({})
    }
    const mainTransaction = new MainTransaction(repository as any)
    await mainTransaction.createNewTransaction({
      amount: 0,
      date: '2023-07-01',
      category: 'category',
      type: 'invalid',
      name: 'name'
    })
    expect(persistTransactions).toEqual([])
    expect(mainTransaction.allData.listTransactions).toEqual([])
  })
})
