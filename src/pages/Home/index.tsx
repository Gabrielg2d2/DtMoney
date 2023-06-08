import { Transaction } from '@/domain/Transaction/Transaction'
import { HomeTemplateUI, HomeTemplateUITypes } from './templates'
import { useEffect, useState } from 'react'
import { getListTransactions } from './service/get/getListTransactions'
import { createTransaction } from './service/create/createTransaction'
import { deleteTransaction } from './service/delete/deleteTransaction'
import { updateTransaction } from './service/update/updateTransaction'

export function Home() {
  const [transactions, setTransactions] = useState(
    new Transaction(
      getListTransactions,
      createTransaction,
      deleteTransaction,
      updateTransaction
    )
  )

  async function handleDeleteTransaction(id: string) {
    await transactions.delete(id)
  }

  useEffect(() => {
    async function amountTransactions() {
      const currentTransaction = new Transaction(
        getListTransactions,
        createTransaction,
        deleteTransaction,
        updateTransaction
      )

      await currentTransaction.list()
      setTransactions(currentTransaction)
    }
    void amountTransactions()
  }, [])

  const dataHomeTemplate: HomeTemplateUITypes = {
    header: {
      submit: async () => {
        await Promise.resolve()
      }
    },
    sectionCardsTransactions: {
      totalIncomingTransactions: 'R$ 0,00',
      totalOutgoingTransactions: 'R$ 0,00',
      totalTransactions: 'R$ 0,00'
    },
    sectionListTransactions: {
      list: transactions.getList,
      handleDeleteTransaction,
      handleOpenModalTransactionToEdit: () => {},
      loading: false
    }
  }

  return <HomeTemplateUI {...dataHomeTemplate} />
}
