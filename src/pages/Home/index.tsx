import { HomeTemplateUI, HomeTemplateUITypes } from './templates'
import { useCallback, useEffect, useState } from 'react'
import { FactoryTransaction } from '@/domain/Transaction/FactoryTransaction'
import { FactoryCards } from '@/domain/Cards/FactoryCards'
import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { DialogEditTransaction, FormTypes } from '@/components'

export function Home() {
  const [openEditTransaction, setOpenEditTransaction] = useState(false)
  const [transaction, setTransaction] = useState<TransactionDataTypes>({
    id: '',
    name: '',
    amount: 0,
    category: '',
    type: 'deposit',
    date: ''
  })
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

  async function handleSubmitNewTransaction(data: FormTypes) {
    setLoading(true)
    const obj = {
      name: data.name,
      amount: Number(data.amount),
      category: data.category,
      type: data.type,
      date: new Date().toISOString()
    }
    await transactions.create(obj as TransactionDataTypes)
    await cards.getCards()
    setLoading(false)
  }

  async function handleSubmitEditTransaction(data: TransactionDataTypes) {
    setLoading(true)
    await transactions.update(data)
    await cards.getCards()
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
      totalIncomingTransactions: cards.totalCards.totalIncomingTransactions,
      totalOutgoingTransactions: cards.totalCards.totalOutgoingTransactions,
      totalTransactions: cards.totalCards.totalTransactions
    },
    sectionListTransactions: {
      list: transactions.getList,
      deleteTransaction: handleDeleteTransaction,
      handleOpenModalTransactionToEdit: (transaction: TransactionDataTypes) => {
        console.log(transaction)
        setTransaction(transaction)
        setOpenEditTransaction(true)
      },
      loading
    }
  }

  return (
    <>
      <HomeTemplateUI {...dataHomeTemplate} />
      <DialogEditTransaction
        transaction={transaction}
        handleSubmit={handleSubmitEditTransaction}
        open={openEditTransaction}
        close={() => {
          setOpenEditTransaction(false)
        }}
      />
    </>
  )
}
