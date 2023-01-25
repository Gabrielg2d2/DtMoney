import { useCallback, useEffect, useState } from 'react'
import {
  CardIncoming,
  CardOutgoing,
  CardTotal,
  Container,
  Header,
  ListTransactions
} from '@/components'
import { MainTransaction } from '@/data-layer/transaction/main/main'
import { DataTransactionFormatProps } from '@/domain/transaction/use-cases/list-transactions/model'

type TransactionProps = {
  data: DataTransactionFormatProps[]
  totalTransactions: string
  totalIncomingTransactions: string
  totalOutgoingTransactions: string
}

export function Home() {
  const [transactions, setTransactions] = useState<TransactionProps | null>(
    null
  )

  const listTransactions = useCallback(async () => {
    const mainTransaction = new MainTransaction()
    const response = await mainTransaction.handleListTransactions()
    setTransactions(response)
  }, [])

  useEffect(() => {
    void listTransactions()
  }, [listTransactions])

  return (
    <Container>
      <Header />

      <main className="max-w-screen-xl mx-auto mt-[-48px]">
        <section className="flex items-center gap-8 max-sm:px-4 overflow-x-auto">
          <CardIncoming
            value={transactions?.totalIncomingTransactions ?? 'R$0,00'}
          />
          <CardOutgoing
            value={transactions?.totalOutgoingTransactions ?? 'R$0,00'}
          />
          <CardTotal value={transactions?.totalTransactions ?? 'R$0,00'} />
        </section>

        <section className="mt-10">
          <ListTransactions list={transactions?.data ?? []} />
        </section>
      </main>
    </Container>
  )
}
