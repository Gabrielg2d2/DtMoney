import { TotalOutgoingTransactions } from '.'

describe('TotalOutgoingTransactions', () => {
  it('should return the total of outgoing transactions', () => {
    const totalOutgoingTransactions = new TotalOutgoingTransactions()
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
        type: 'withdrawn', // <--- This is the only difference
        category: 'Salary',
        amount: 100,
        date: '2021-05-01T00:00:00.000Z'
      },
      {
        id: '4',
        name: 'Salary',
        type: 'withdrawn', // <--- This is the only difference
        category: 'Salary',
        amount: 1000,
        date: '2021-05-01T00:00:00.000Z'
      }
    ]
    const total =
      totalOutgoingTransactions.filterTotalOutgoingTransactions(transactions)
    expect(total).toBe(1100)
  })
})
