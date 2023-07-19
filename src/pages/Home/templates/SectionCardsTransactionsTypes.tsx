import { CardIncoming, CardOutgoing, CardTotal } from '@/components'

export type SectionCardsTransactionsTypes = {
  totalIncomingTransactions: string
  totalOutgoingTransactions: string
  totalTransactions: string
}

export function SectionCardsTransactions(props: SectionCardsTransactionsTypes) {
  return (
    <section className="flex items-center gap-8 max-sm:px-4 overflow-x-auto">
      <CardIncoming amount={props.totalIncomingTransactions} />
      <CardOutgoing amount={props.totalOutgoingTransactions} />
      <CardTotal amount={props.totalTransactions} />
    </section>
  )
}
