import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect
} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MainTransaction } from '@/data-layer/transaction/main/main'
import { DialogTransaction } from '@/components'

import { DataForm, MethodsTypes, SetLoadingTypes } from './types'
import {
  schema,
  handleSubmit,
  updateTransaction,
  openModalEdit,
  deleteTransaction,
  listTransactions,
  make
} from './functions'
import { TransactionDataAPI } from '@/domain/transaction/types/global/transactions'

type TransactionsType = {
  children: ReactNode
}

type TransactionsContextType = {
  loading: boolean
  setLoading: SetLoadingTypes
  make: (isEdit?: boolean) => {
    title: string
    description: string
  }
  methods: MethodsTypes
  onSubmit: (data: DataForm) => Promise<void>
  mainTransaction: typeof MainTransaction
  handleDeleteTransaction: (id: string) => Promise<void>
  handleOpenModalTransaction: () => void
  handleOpenModalTransactionToEdit: (transaction: TransactionDataAPI) => void
}

const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsType) {
  const mainTransaction = MainTransaction
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const methods = useForm<DataForm>({
    defaultValues: {
      id: '',
      name: '',
      amount: '',
      type: 'withdrawn',
      category: ''
    },
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const handleOpenModalTransaction = useCallback(() => {
    setOpen(true)
  }, [])

  const handleCloseModalTransaction = useCallback(() => {
    setIsEdit(false)
    setOpen(false)
  }, [])

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      await deleteTransaction({
        setLoading,
        mainTransaction,
        id
      })
    },
    [mainTransaction]
  )

  const handleOpenModalTransactionToEdit = useCallback(
    (transaction: TransactionDataAPI) => {
      openModalEdit({
        transaction,
        methods,
        setIsEdit,
        handleOpenModalTransaction
      })
    },
    [handleOpenModalTransaction, methods]
  )

  const onSubmit = async (data: DataForm) => {
    await handleSubmit({
      isEdit,
      data,
      mainTransaction,
      handleCloseModalTransaction,
      methods,
      setLoading,
      updateTransaction
    })
  }

  useEffect(() => {
    void listTransactions({
      setLoading,
      mainTransaction
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        loading,
        setLoading,
        make,
        methods,
        onSubmit,
        mainTransaction,
        handleDeleteTransaction,
        handleOpenModalTransaction,
        handleOpenModalTransactionToEdit
      }}
    >
      {children}
      <DialogTransaction
        isEdit={isEdit}
        open={open}
        close={handleCloseModalTransaction}
      />
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  return useContext(TransactionsContext)
}
