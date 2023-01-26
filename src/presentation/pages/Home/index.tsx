import {
  CardIncoming,
  CardOutgoing,
  CardTotal,
  Container,
  Header,
  ListTransactions
} from '@/components'
import { useHome } from '@/hook/Home/useHome'

export function Home() {
  const {
    transactions,
    totalIncomingTransactions,
    totalOutgoingTransactions,
    totalTransactions
  } = useHome()

  return (
    <Container>
      <Header />

      <main
        data-testid="main_page_home_id"
        className="max-w-screen-xl mx-auto mt-[-48px]"
      >
        <section className="flex items-center gap-8 max-sm:px-4 overflow-x-auto">
          <CardIncoming value={totalIncomingTransactions} />
          <CardOutgoing value={totalOutgoingTransactions} />
          <CardTotal value={totalTransactions} />
        </section>

        <section className="mt-10">
          <ListTransactions list={transactions} />
        </section>
      </main>
    </Container>
  )
}
