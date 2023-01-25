import { useCallback, useEffect, useState } from 'react'
import { MainTransaction } from '@/data-layer/transaction/main/main'
import { DataTransactionFormatProps } from '@/domain/transaction/use-cases/list-transactions/model'

export function useHome() {
  const [transactions, setTransactions] = useState<
    DataTransactionFormatProps[]
  >([])
  const [totalIncomingTransactions, setTotalIncomingTransactions] =
    useState('R$0,00')

  const [totalOutgoingTransactions, setTotalOutgoingTransactions] =
    useState('R$0,00')

  const [totalTransactions, setTotalTransactions] = useState('R$0,00')

  const listTransactions = useCallback(async () => {
    const mainTransaction = new MainTransaction()
    const response = await mainTransaction.handleListTransactions()
    setTransactions(response.data)
    setTotalIncomingTransactions(response.totalIncomingTransactions)
    setTotalOutgoingTransactions(response.totalOutgoingTransactions)
    setTotalTransactions(response.totalTransactions)
  }, [])

  useEffect(() => {
    void listTransactions()
  }, [listTransactions])

  return {
    transactions,
    totalIncomingTransactions,
    totalOutgoingTransactions,
    totalTransactions
  }
}
