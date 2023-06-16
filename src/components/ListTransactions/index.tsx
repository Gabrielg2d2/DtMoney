import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { Pencil, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { DialogEditTransaction } from '../DialogEditTransaction'

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
  list: TransactionDataTypes[]
  deleteTransaction: (id: string) => Promise<void>
  submit: (data: TransactionDataTypes) => void
}

export function ListTransactions({
  list,
  deleteTransaction,
  submit
}: ListTransactionsProps) {
  const [openEditTransaction, setOpenEditTransaction] = useState(false)
  const [transaction, setTransaction] = useState<TransactionDataTypes>({
    id: '',
    name: '',
    amount: 0,
    category: '',
    type: 'deposit',
    date: ''
  })
  function handleOpenEditModal(transaction: TransactionDataTypes) {
    setTransaction(transaction)
    setOpenEditTransaction(true)
  }

  function formatValue(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value / 100)
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date))
  }

  function formatType(type: string) {
    return type === 'deposit' ? 'Entrada' : 'Saída'
  }

  const listTransactions = useMemo(
    () =>
      list.map((transaction) => {
        const formattedAmount = formatValue(transaction.amount)
        const formattedDate = formatDate(transaction.date)
        const formattedType = formatType(transaction.type)

        return (
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
                ? `-${formattedAmount}`
                : formattedAmount}
            </span>
            <span className="max-sm:hidden text-title-default">
              {formattedType}
            </span>
            <span className="max-sm:hidden text-title-default">
              {formattedDate}
            </span>

            <div className="md:hidden max-sm:w-4/5 max-sm:flex max-sm:justify-between mt-4">
              <span className="text-title-default">{formattedType}</span>
              <span className="text-title-default">{formattedDate}</span>
            </div>
            <button
              title="Editar"
              className="absolute top-4 right-16"
              onClick={() => {
                handleOpenEditModal(transaction)
              }}
            >
              <Pencil size={20} />
            </button>
            <button
              title="Deletar"
              className="absolute top-3 right-4 text-red-500 hover:text-red-700 hover:bg-gray-100 rounded-lg p-1"
              onClick={async () => {
                await deleteTransaction(transaction.id)
              }}
            >
              <Trash size={20} />
            </button>
          </Box>
        )
      }),
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
      <DialogEditTransaction
        transaction={transaction}
        handleSubmit={submit}
        open={openEditTransaction}
        close={() => {
          setOpenEditTransaction(false)
        }}
      />
    </>
  )
}
