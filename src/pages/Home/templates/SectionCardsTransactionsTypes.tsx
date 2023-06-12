import { CardIncoming, CardOutgoing, CardTotal } from '@/components'

export type SectionCardsTransactionsTypes = {
  totalIncomingTransactions: number
  totalOutgoingTransactions: number
  totalTransactions: number
}

export function SectionCardsTransactions(props: SectionCardsTransactionsTypes) {
  return (
    <section className="flex items-center gap-8 max-sm:px-4 overflow-x-auto">
      <CardIncoming value={props.totalIncomingTransactions} />
      <CardOutgoing value={props.totalOutgoingTransactions} />
      <CardTotal value={props.totalTransactions} />
    </section>
  )
}
