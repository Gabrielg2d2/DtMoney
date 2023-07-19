import { formatMoneyPtBr } from '@/util'
import { TransactionEntityType } from '../types/transaction-entity'

export class serviceCards {
  private static calcTotal(listTransactions: TransactionEntityType[]) {
    const cards = {
      total: 0,
      income: 0,
      outcome: 0
    }
    listTransactions.forEach((transaction) => {
      if (transaction.type === 'deposit') {
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
      total: formatMoneyPtBr(cards.total),
      income: formatMoneyPtBr(cards.income),
      outcome: formatMoneyPtBr(cards.outcome)
    }
    return cardsFormatted
  }

  static calcCards(listTransactions: TransactionEntityType[]) {
    const cards = this.calcTotal(listTransactions)
    const cardsFormatted = this.formattedCardsPtBr(cards)
    return cardsFormatted
  }
}
