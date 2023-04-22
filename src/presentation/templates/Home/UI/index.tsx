import {
  CardIncoming,
  CardOutgoing,
  CardTotal,
  Container,
  Header,
  ListTransactions
} from '@/components'
import {
  TransactionDataAPI,
  TransactionDataAPIFormat
} from '@/domain/transaction/types/global/transactions'

type MainTransactionTypes = {
  url: string
  transactions: TransactionDataAPIFormat[]
  totalIncomingTransactions: string
  totalOutgoingTransactions: string
  totalTransactions: string
}

type HomeTemplateUITypes = {
  mainTransaction: MainTransactionTypes
  handleDeleteTransaction: (id: string) => Promise<void>
  handleOpenModalTransaction: () => void
  handleOpenModalTransactionToEdit: (transaction: TransactionDataAPI) => void
  loading: boolean
}

export function HomeTemplateUI(props: HomeTemplateUITypes) {
  return (
    <Container>
      <Header handleOpenModalTransaction={props.handleOpenModalTransaction} />

      <main
        data-testid="main_page_home_id"
        className="max-w-screen-xl mx-auto mt-[-48px]"
      >
        <section className="flex items-center gap-8 max-sm:px-4 overflow-x-auto">
          <CardIncoming
            value={props.mainTransaction.totalIncomingTransactions}
          />
          <CardOutgoing
            value={props.mainTransaction.totalOutgoingTransactions}
          />
          <CardTotal value={props.mainTransaction.totalTransactions} />
        </section>

        <section className="mt-10">
          {props.loading && <p>Carregando...</p>}
          <ListTransactions
            list={props.mainTransaction.transactions}
            handleDeleteTransaction={props.handleDeleteTransaction}
            handleOpenModalTransactionToEdit={
              props.handleOpenModalTransactionToEdit
            }
          />
        </section>
      </main>
    </Container>
  )
}
