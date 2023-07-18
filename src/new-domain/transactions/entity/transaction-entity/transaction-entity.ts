import { formatMoneyPtBr } from '@/global/functions/formatMoneyPtBr/formatMoneyPtBr'
import { TransactionEntityType } from '../../types/transaction-entity'
import { formatDatePtBr } from '@/global/functions/formatDate/formatDatePtBr'
import { TransactionACLType } from '../../types/transaction-acl'

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
    language: string = 'pt-BR' // translate
  ): TransactionACLType {
    if (!this.validateTransactionEntity(transaction)) {
      throw new Error(
        'Invalid transaction object. Please check the values of the transaction object.'
      )
    }

    const { id, amount, date, category, type, name } = transaction

    // translate future
    const amountFormatted =
      language === 'pt-BR' ? formatMoneyPtBr(amount) : String(amount)

    const dateFormatted = language === 'pt-BR' ? formatDatePtBr(date) : date

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
