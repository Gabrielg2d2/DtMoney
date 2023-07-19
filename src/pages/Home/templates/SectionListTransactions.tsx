import { ListTransactions } from '@/components'
import { TransactionACLType } from '@/domain/transactions/types/transaction-acl'

export type SectionListTransactionsTypes = {
  list: TransactionACLType[]
  deleteTransaction: (id: string) => Promise<void>
  submit: (data: TransactionACLType) => void
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
