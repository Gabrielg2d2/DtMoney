import { serviceCards } from './cards'

describe('serviceCards', () => {
  test('should calc cards', () => {
    const listTransactions = [
      {
        id: '1',
        amount: 100,
        date: '2021-01-01',
        category: 'category',
        type: 'deposit',
        name: 'name'
      },
      {
        id: '2',
        amount: 100,
        date: '2021-01-01',
        category: 'category',
        type: 'withdrawn',
        name: 'name'
      }
    ]
    const cards = serviceCards.calcCards(listTransactions)
    expect(cards).toEqual({
      income: 'R$ 1,00',
      outcome: 'R$ 1,00',
      total: 'R$ 0,00'
    })
  })
})
