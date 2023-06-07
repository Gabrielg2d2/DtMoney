import { ListTransactions } from './ListTransactions'

describe('ListTransactions', () => {
  it('should list transactions empty', async () => {
    const listTransactionsAPISpy = jest.fn().mockResolvedValue([])
    const listTransactions = new ListTransactions(listTransactionsAPISpy)
    const response = await listTransactions.execute()
    expect(listTransactionsAPISpy).toHaveBeenCalledWith()
    expect(response).toEqual([])
  })

  it('should list transactions', async () => {
    const listTransactionsAPISpy = jest.fn().mockResolvedValue([
      {
        id: 'jest_id',
        amount: 100,
        date: '2021-01-01',
        description: 'jest_description',
        type: 'deposit'
      }
    ])

    const listTransactions = new ListTransactions(listTransactionsAPISpy)
    const response = await listTransactions.execute()
    expect(listTransactionsAPISpy).toBeCalledTimes(1)
    expect(response).toEqual([
      {
        id: 'jest_id',
        amount: 100,
        date: '2021-01-01',
        description: 'jest_description',
        type: 'deposit'
      }
    ])
  })
})
