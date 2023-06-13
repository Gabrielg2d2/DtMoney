import { HomeTemplateUI, HomeTemplateUITypes } from './templates'
import { useCallback, useEffect, useState } from 'react'
import { FactoryTransaction } from '@/domain/Transaction/FactoryTransaction'
import { DialogTransaction, FormTypes } from '@/components'
import { FactoryCards } from '@/domain/Cards/FactoryCards'
import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'

export function Home() {
  const [loading, setLoading] = useState(false)
  const [transactions] = useState(new FactoryTransaction().execute())
  const [cards] = useState(new FactoryCards().execute())

  async function handleDeleteTransaction(id: string) {
    setLoading(true)
    await transactions.delete(id)
    await cards.getCards()
    setLoading(false)
  }

  const listTransactions = useCallback(async () => {
    setLoading(true)
    await transactions.list()
    await cards.getCards()
    setLoading(false)
  }, [cards, transactions])

  async function handleSubmit(data: FormTypes) {
    setLoading(true)
    const obj = {
      name: data.name,
      amount: Number(data.amount),
      category: data.category,
      type: data.type,
      date: new Date().toISOString()
    }
    await transactions.create(obj as TransactionDataTypes)
    setLoading(false)
  }

  useEffect(() => {
    void listTransactions()
  }, [listTransactions])

  const dataHomeTemplate: HomeTemplateUITypes = {
    header: {
      dialogTransaction: (
        <DialogTransaction
          title="Nova transação"
          description="
          Preencha os campos abaixo para adicionar uma nova transação.
        "
          handleSubmit={handleSubmit}
        />
      )
    },
    sectionCardsTransactions: {
      totalIncomingTransactions: cards.totalCards.totalIncomingTransactions,
      totalOutgoingTransactions: cards.totalCards.totalOutgoingTransactions,
      totalTransactions: cards.totalCards.totalTransactions
    },
    sectionListTransactions: {
      list: transactions.getList,
      deleteTransaction: handleDeleteTransaction,
      handleOpenModalTransactionToEdit: () => {},
      loading
    }
  }

  return <HomeTemplateUI {...dataHomeTemplate} />
}
