import { ListTransactions } from '@/components'
import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'

export type SectionListTransactionsTypes = {
  list: TransactionDataTypes[]
  deleteTransaction: (id: string) => Promise<void>
  submit: (data: TransactionDataTypes) => void
  loading: boolean
}
export function SectionListTransactions(props: SectionListTransactionsTypes) {
  return (
    <section className="mt-10">
      {props.loading && <p>Carregando...</p>}
      <ListTransactions
        list={props.list}
        deleteTransaction={props.deleteTransaction}
        submit={props.submit}
      />
    </section>
  )
}
