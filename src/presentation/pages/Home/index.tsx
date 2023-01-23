import { Container, Header } from '@/components'

export function Home() {
  return (
    <Container>
      <Header />

      <main className="max-w-screen-xl mx-auto border">
        <section>
          <h2>Summary</h2>
          <h2>Summary</h2>
          <h2>Summary</h2>
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
