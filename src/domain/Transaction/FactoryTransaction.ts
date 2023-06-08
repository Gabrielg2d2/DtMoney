import { getListTransactions } from '@/pages/Home/service/get/getListTransactions'
import { Transaction } from './Transaction'
import { createTransaction } from '@/pages/Home/service/create/createTransaction'
import { deleteTransaction } from '@/pages/Home/service/delete/deleteTransaction'
import { updateTransaction } from '@/pages/Home/service/update/updateTransaction'

export class FactoryTransaction {
  execute() {
    const transaction = new Transaction(
      getListTransactions,
      createTransaction,
      deleteTransaction,
      updateTransaction
    )

    return transaction
  }
}
