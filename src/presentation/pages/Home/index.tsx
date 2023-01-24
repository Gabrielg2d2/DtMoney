import {
  CardIncoming,
  CardOutgoing,
  CardTotal,
  Container,
  Header
} from '@/components'

export function Home() {
  return (
    <Container>
      <Header />

      <main className="max-w-screen-xl mx-auto mt-[-48px]">
        <section className="flex items-center gap-8 max-sm:px-4 overflow-x-auto">
          <CardIncoming value="R$ 1000,00" />
          <CardOutgoing value="R$ 100,00" />
          <CardTotal value="R$ 9000,00" />
        </section>

        <section>
          <h2>Transactions</h2>
          <h2>Transactions</h2>
          <h2>Transactions</h2>
        </section>
      </main>
    </Container>
  )
}
