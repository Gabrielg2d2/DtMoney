import { TransactionDataAPIFormat } from '@/domain/transaction/types/global/transactions'
import { useMemo } from 'react'

type BoxProps = {
  children: React.ReactNode
}

function Box({ children }: BoxProps) {
  return (
    <div className="bg-white text-text-default rounded-sm grid grid-cols-4 items-center pl-8 h-16 min-h-16 max-sm:flex max-sm:flex-col max-sm:h-36 max-sm:min-h-36 max-sm:items-start max-sm:pt-4">
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
}

export function ListTransactions({ list }: ListTransactionsProps) {
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
        </Box>
      )),
    [list]
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
