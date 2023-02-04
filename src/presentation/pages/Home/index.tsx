import { TransactionsProvider } from '@/context/transactions'
import { HomeTemplate } from '@/presentation/templates/Home'

export function Home() {
  return (
    <TransactionsProvider>
      <HomeTemplate />
    </TransactionsProvider>
  )
}
