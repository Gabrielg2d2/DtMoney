import {
  CardIncoming,
  CardOutgoing,
  CardTotal,
  Container,
  Header,
  ListTransactions
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

        <section className="mt-10">
          <ListTransactions
            list={[
              {
                id: '132',
                name: 'Salário',
                amount: 'R$ 1000,00',
                type: 'income',
                category: 'Salário',
                date: '10/10/2021'
              },
              {
                id: '132',
                name: 'Aluguel',
                amount: 'R$ 200,00',
                type: 'income',
                category: 'Casa',
                date: '10/10/2021'
              },
              {
                id: '132',
                name: 'Salário',
                amount: 'R$ 1000,00',
                type: 'withdrawn',
                category: 'Salário',
                date: '10/10/2021'
              },
              {
                id: '132',
                name: 'Salário',
                amount: 'R$ 1000,00',
                type: 'income',
                category: 'Salário',
                date: '10/10/2021'
              },
              {
                id: '132',
                name: 'Aluguel',
                amount: 'R$ 200,00',
                type: 'income',
                category: 'Casa',
                date: '10/10/2021'
              },
              {
                id: '132',
                name: 'Salário',
                amount: 'R$ 1000,00',
                type: 'withdrawn',
                category: 'Salário',
                date: '10/10/2021'
              },
              {
                id: '132',
                name: 'Salário',
                amount: 'R$ 1000,00',
                type: 'income',
                category: 'Salário',
                date: '10/10/2021'
              },
              {
                id: '132',
                name: 'Aluguel',
                amount: 'R$ 200,00',
                type: 'income',
                category: 'Casa',
                date: '10/10/2021'
              },
              {
                id: '132',
                name: 'Salário',
                amount: 'R$ 1000,00',
                type: 'withdrawn',
                category: 'Salário',
                date: '10/10/2021'
              }
            ]}
          />
        </section>
      </main>
    </Container>
  )
}
