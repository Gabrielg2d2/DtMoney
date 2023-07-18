import { TransactionObjectValueType } from '../types/transaction-object-value'
import { TransactionValueObject } from '../value-object/transaction-value-object/transaction-value-object'

export class CreateTransaction {
  execute(transaction: TransactionObjectValueType) {
    const transactionValueObject = new TransactionValueObject()
    const isValid =
      transactionValueObject.validateTransactionObject(transaction)

    if (!isValid) {
      throw new Error(
        'Invalid transaction object. Please check the values of the transaction object.'
      )
    }
    return transaction
  }
}
