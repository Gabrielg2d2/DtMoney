import { TotalIncomingTransactions } from '.'

describe('TotalIncomingTransactions', () => {
  it('should return the total of incoming transactions', () => {
    const totalIncomingTransactions = new TotalIncomingTransactions()

    const transactions = [
      {
        id: '1',
        name: 'Salary',
        type: 'deposit', // <--- This is the only difference
        category: 'Salary',
        amount: 1000
      },
      {
        id: '2',
        name: 'Salary',
        type: 'deposit', // <--- This is the only difference
        category: 'Salary',
        amount: 1000
      },
      {
        id: '3',
        name: 'Salary',
        type: 'deposit', // <--- This is the only difference
        category: 'Salary',
        amount: 1000
      },
      {
        id: '4',
        name: 'Salary',
        type: 'withdraw',
        category: 'Salary',
        amount: 1000
      }
    ]

    const total =
      totalIncomingTransactions.filterTotalIncomingTransactions(transactions)

    expect(total).toBe(3000)
  })
})
