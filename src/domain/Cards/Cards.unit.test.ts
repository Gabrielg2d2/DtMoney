import { Cards } from './Cards'

describe('Cards', () => {
  it('should get cards', async () => {
    const getCardsAPI = jest.fn().mockResolvedValue({
      totalIncomingTransactions: 1,
      totalOutgoingTransactions: 2,
      totalTransactions: 3
    })

    const cards = new Cards(getCardsAPI)
    await cards.getCards()

    expect(cards.totalCards).toEqual({
      totalIncomingTransactions: 1,
      totalOutgoingTransactions: 2,
      totalTransactions: 3
    })
  })

  it('should throw error when get cards', async () => {
    const getCardsAPI = jest.fn().mockResolvedValue(undefined)

    const cards = new Cards(getCardsAPI)
    await expect(cards.getCards()).rejects.toThrowError('Error getting cards')

    expect(cards.totalCards).toEqual({
      totalIncomingTransactions: 0,
      totalOutgoingTransactions: 0,
      totalTransactions: 0
    })
  })

  it('should return result the function totalCards', async () => {
    const getCardsAPI = jest.fn().mockResolvedValue({
      totalIncomingTransactions: 1,
      totalOutgoingTransactions: 2,
      totalTransactions: 3
    })

    const cards = new Cards(getCardsAPI)
    await cards.getCards()

    expect(cards.totalCards).toEqual({
      totalIncomingTransactions: 1,
      totalOutgoingTransactions: 2,
      totalTransactions: 3
    })
  })
})
