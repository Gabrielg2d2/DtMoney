import { TransactionDataAPIFormat } from '@/domain/transaction/types/global/transactions'
import { Trash } from 'phosphor-react'
import { useMemo } from 'react'
import { DialogTransaction } from '../DialogNewTransaction'

type BoxProps = {
  children: React.ReactNode
}

function Box({ children }: BoxProps) {
  return (
    <div className="relative bg-white text-text-default rounded-sm grid grid-cols-4 items-center pl-8 h-16 min-h-16 max-sm:flex max-sm:flex-col max-sm:h-36 max-sm:min-h-36 max-sm:items-start max-sm:pt-4">
      {children}
    </div>
  )
}

function Header() {
  return (
    <>
      <div
        data-testid="header_list_transactions"
        className="text-title-default rounded-sm grid grid-cols-4 items-center pl-8 h-16 min-h-16 max-sm:hidden"
      >
        <span>Título</span>
        <span>Preço</span>
        <span>Categoria</span>
        <span>Data</span>
      </div>

      <span className="md:hidden pl-4 text-text-default text-xl">Listagem</span>
    </>
  )
}

type ListTransactionsProps = {
  list: TransactionDataAPIFormat[]
  deleteTransaction: (id: string) => Promise<void>
}

export function ListTransactions({
  list,
  deleteTransaction
}: ListTransactionsProps) {
  const listTransactions = useMemo(
    () =>
      list.map((transaction) => (
        <Box key={transaction.id}>
          <span>{transaction.name}</span>
          <span
            className={`max-sm:mt-2 max-sm:text-xl ${
              transaction.type === 'withdrawn'
                ? 'text-red-default'
                : 'text-green-default'
            }`}
          >
            {transaction.type === 'withdrawn'
              ? `-${transaction.amountFormatted}`
              : transaction.amountFormatted}
          </span>
          <span className="max-sm:hidden text-title-default">
            {transaction.category}
          </span>
          <span className="max-sm:hidden text-title-default">
            {transaction.dateFormatted}
          </span>

          <div className="md:hidden max-sm:w-4/5 max-sm:flex max-sm:justify-between mt-4">
            <span className="text-title-default">{transaction.category}</span>
            <span className="text-title-default">
              {transaction.dateFormatted}
            </span>
          </div>
          <DialogTransaction isEdit />
          <button
            title="Deletar"
            className="absolute top-auto right-4 text-red-500 hover:text-red-700 hover:bg-gray-100 rounded-lg p-1"
            onClick={async () => {
              await deleteTransaction(transaction.id)
            }}
          >
            <Trash size={20} />
          </button>
        </Box>
      )),
    [deleteTransaction, list]
  )

  if (!list.length) {
    return (
      <>
        <div className="flex justify-center items-center h-96">
          <span className="text-title-default text-2xl">
            Nenhuma transação encontrada
          </span>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div
        data-testid="list_transactions_id"
        className="max-sm:mt-4 max-sm:px-4 max-h-[500px] overflow-y-auto"
      >
        <div className="flex flex-col gap-4">{listTransactions}</div>
      </div>
    </>
  )
}
