import { TotalTransactions } from '.'

describe('TotalTransactions', () => {
  it('should return the total of transactions', () => {
    const totalTransactions = new TotalTransactions()
    const transactions = [
      {
        id: '1',
        name: 'Salary',
        type: 'deposit',
        category: 'Salary',
        amount: 1000,
        date: '2021-05-01T00:00:00.000Z'
      },
      {
        id: '2',
        name: 'Salary',
        type: 'deposit',
        category: 'Salary',
        amount: 1000,
        date: '2021-05-01T00:00:00.000Z'
      },
      {
        id: '3',
        name: 'Salary',
        type: 'withdrawn',
        category: 'Salary',
        amount: 1000,
        date: '2021-05-01T00:00:00.000Z'
      },
      {
        id: '4',
        name: 'Salary',
        type: 'withdrawn',
        category: 'Salary',
        amount: 100,
        date: '2021-05-01T00:00:00.000Z'
      }
    ]
    const total = totalTransactions.filterTotalTransactions(transactions)
    expect(total).toBe(900)
  })
})
