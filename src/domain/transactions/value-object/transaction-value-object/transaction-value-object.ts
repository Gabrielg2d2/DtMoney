import { TransactionObjectValueType } from '../../types/transaction-object-value'

export class TransactionValueObject {
  validateTransactionObject(
    transactionObject: TransactionObjectValueType
  ): boolean {
    const { amount, date, category, type, name } = transactionObject

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
}
