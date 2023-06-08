import { ListTransactions } from '@/components'
import { TransactionDataTypes } from '@/entity/Transaction/Transaction'

export type SectionListTransactionsTypes = {
  list: TransactionDataTypes[]
  handleDeleteTransaction: (id: string) => Promise<void>
  handleOpenModalTransactionToEdit: (transaction: TransactionDataTypes) => void
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
