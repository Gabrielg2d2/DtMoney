import { HomeTemplateUI, HomeTemplateUITypes } from './templates'
import { useCallback, useEffect, useState } from 'react'
import { FactoryTransaction } from '@/domain/Transaction/FactoryTransaction'
import { DialogTransaction } from '@/components'
import { FactoryCards } from '@/domain/Cards/FactoryCards'

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
          handleSubmit={async () => {}}
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
