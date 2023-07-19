import { HomeTemplateUI, HomeTemplateUITypes } from './templates'
import { useCallback, useEffect, useState } from 'react'
import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { FormTypes } from '@/components'
import { MainTransaction } from '@/domain/transactions/main'
import { TransactionACLType } from '@/domain/transactions/types/transaction-acl'

export function Home() {
  const [loading, setLoading] = useState(false)
  const [transactions] = useState(new MainTransaction())

  async function handleDeleteTransaction(id: string) {
    setLoading(true)
    await transactions.deleteTransaction(id)
    setLoading(false)
  }

  const listTransactions = useCallback(async () => {
    setLoading(true)
    await transactions.listTransactions()
    setLoading(false)
  }, [transactions])

  async function handleSubmitNewTransaction(data: FormTypes) {
    setLoading(true)
    const obj = {
      name: data.name,
      amount: Number(data.amount),
      category: data.category,
      type: data.type,
      date: new Date().toISOString()
    }
    await transactions.createNewTransaction(obj as TransactionDataTypes)
    setLoading(false)
  }

  async function handleSubmitEditTransaction(data: TransactionACLType) {
    setLoading(true)
    await transactions.updateTransaction(data)
    setLoading(false)
  }

  useEffect(() => {
    void listTransactions()
  }, [listTransactions])

  const dataHomeTemplate: HomeTemplateUITypes = {
    header: {
      submit: handleSubmitNewTransaction
    },
    sectionCardsTransactions: {
      totalIncomingTransactions: transactions.allData.cards.income,
      totalOutgoingTransactions: transactions.allData.cards.outcome,
      totalTransactions: transactions.allData.cards.total
    },
    sectionListTransactions: {
      list: transactions.allData.listTransactions,
      deleteTransaction: handleDeleteTransaction,
      submit: handleSubmitEditTransaction,
      loading
    }
  }

  return (
    <>
      <HomeTemplateUI {...dataHomeTemplate} />
    </>
  )
}
