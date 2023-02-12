import {
  CardIncoming,
  CardOutgoing,
  CardTotal,
  Container,
  Header,
  ListTransactions
} from '@/components'
import { useTransactionsContext } from '@/context/transactions'

export function HomeTemplate() {
  const {
    mainTransaction,
    deleteTransaction,
    handleOpenModalTransaction,
    handleOpenModalTransactionToEdit,
    loading
  } = useTransactionsContext()

  return (
    <Container>
      <Header handleOpenModalTransaction={handleOpenModalTransaction} />

      <main
        data-testid="main_page_home_id"
        className="max-w-screen-xl mx-auto mt-[-48px]"
      >
        <section className="flex items-center gap-8 max-sm:px-4 overflow-x-auto">
          <CardIncoming value={mainTransaction.totalIncomingTransactions} />
          <CardOutgoing value={mainTransaction.totalOutgoingTransactions} />
          <CardTotal value={mainTransaction.totalTransactions} />
        </section>

        <section className="mt-10">
          {loading && <p>Carregando...</p>}
          <ListTransactions
            list={mainTransaction.transactions}
            deleteTransaction={deleteTransaction}
            updateTransaction={handleOpenModalTransactionToEdit}
          />
        </section>
      </main>
    </Container>
  )
}
