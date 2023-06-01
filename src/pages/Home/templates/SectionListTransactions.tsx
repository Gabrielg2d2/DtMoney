import { ListTransactions } from '@/components'

type TransactionsTypes = {
  id: string
  name: string
  amount: number
  type: string
  category: string
  date: string
}

export type SectionListTransactionsTypes = {
  list: TransactionsTypes[]
  handleDeleteTransaction: (id: string) => Promise<void>
  handleOpenModalTransactionToEdit: (transaction: TransactionsTypes) => void
  loading: boolean
}
export function SectionListTransactions(props: SectionListTransactionsTypes) {
  return (
    <section className="mt-10">
      {props.loading && <p>Carregando...</p>}
      <ListTransactions
        list={props.list}
        handleDeleteTransaction={props.handleDeleteTransaction}
        handleOpenModalTransactionToEdit={
          props.handleOpenModalTransactionToEdit
        }
      />
    </section>
  )
}
