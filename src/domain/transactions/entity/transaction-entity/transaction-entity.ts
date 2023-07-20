import { TransactionEntityType } from '../../types/transaction-entity'
import { TransactionACLType } from '../../types/transaction-acl'
import { formatDate, formatMoneyPtBr } from '@/util'
import { LANGUAGE_PT_BR } from '@/domain/constant/constant'

export class TransactionEntity {
  validateTransactionEntity(transactionEntity: TransactionEntityType): boolean {
    const { id, amount, date, category, type, name } = transactionEntity

    if (!id || typeof id !== 'string') {
      return false
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return false
    }

    if (typeof date !== 'string' || !Date.parse(date)) {
      return false
    }

    if (typeof category !== 'string' || category.length < 3) {
      return false
    }

    if (typeof type !== 'string' || !['withdrawn', 'deposit'].includes(type)) {
      return false
    }

    if (typeof name !== 'string' || name.length < 3) {
      return false
    }

    return true
  }

  createTransactionEntity(
    transaction: TransactionEntityType,
    language: string = LANGUAGE_PT_BR // translate
  ): TransactionACLType {
    if (!this.validateTransactionEntity(transaction)) {
      return
    }

    const { id, amount, date, category, type, name } = transaction

    // translate future
    const amountFormatted =
      language === LANGUAGE_PT_BR ? formatMoneyPtBr(amount) : String(amount)

    const dateFormatted =
      language === LANGUAGE_PT_BR ? formatDate(date).split('T')[0] : date

    return {
      id,
      amount,
      amountFormatted,
      date,
      dateFormatted,
      category,
      type,
      name
    }
  }
}
