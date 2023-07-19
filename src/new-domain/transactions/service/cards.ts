import { TransactionEntityType } from '../types/transaction-entity'

export class serviceCards {
  private static calcTotal(listTransactions: TransactionEntityType[]) {
    const cards = {
      total: 0,
      income: 0,
      outcome: 0
    }
    listTransactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        cards.income += transaction.amount
      } else {
        cards.outcome += transaction.amount
      }
    })
    cards.total = cards.income - cards.outcome
    return cards
  }

  private static formattedCardsPtBr(cards: any) {
    const cardsFormatted = {
      total: cards.total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }),
      income: cards.income.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }),
      outcome: cards.outcome.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }
    return cardsFormatted
  }

  static calcCards(listTransactions: TransactionEntityType[]) {
    const cards = this.calcTotal(listTransactions)
    const cardsFormatted = this.formattedCardsPtBr(cards)
    return cardsFormatted
  }
}
