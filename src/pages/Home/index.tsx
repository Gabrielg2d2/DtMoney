import { HomeTemplateUI, HomeTemplateUITypes } from './templates'
import { useEffect, useState } from 'react'
import { FactoryTransaction } from '@/domain/Transaction/FactoryTransaction'

export function Home() {
  const [transactions, setTransactions] = useState(
    new FactoryTransaction().execute()
  )

  async function handleDeleteTransaction(id: string) {
    const newTransactions = new FactoryTransaction().execute()
    await newTransactions.delete(id)
    setTransactions(newTransactions)
  }

  useEffect(() => {
    async function amountTransactions() {
      const newTransactions = new FactoryTransaction().execute()
      await newTransactions.list()
      setTransactions(newTransactions)
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
