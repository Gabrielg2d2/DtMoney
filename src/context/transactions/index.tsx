import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect
} from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MainTransaction } from '@/data-layer/transaction/main/main'
import { Pencil } from 'phosphor-react'
import { DialogTransaction } from '@/components'
import { TransactionDataAPI } from '@/domain/transaction/types/global/transactions'

type DataForm = {
  id?: string
  name: string
  amount: string
  type: string
  category: string
}

type TransactionsType = {
  children: ReactNode
}

type TransactionsContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  make: (isEdit: boolean) => {
    title: string
    description: string
    buttonOpen: JSX.Element
  }
  methods: UseFormReturn<DataForm, any>
  onSubmit: (data: DataForm) => Promise<void>
  mainTransaction: typeof MainTransaction
  deleteTransaction: (id: string) => Promise<void>
  updateTransaction: (transaction: TransactionDataAPI) => Promise<void>
  handleOpenModalTransaction: () => void
  handleOpenModalTransactionToEdit: (body: TransactionDataAPI) => void
}

const schema = z.object({
  name: z.string().min(1, { message: 'Obrigatório' }),
  amount: z
    .string()
    .min(1, { message: 'Obrigatório' })
    .refine(
      (value) => {
        const price = Number(value) ?? 0
        return price > 0
      },
      { message: 'Somente número positivo' }
    ),
  type: z.enum(['withdrawn', 'deposit']),
  category: z.string().min(1, { message: 'Obrigatório' })
})

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsType) {
  const mainTransaction = MainTransaction
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const make = useCallback((isEdit = false) => {
    const title = isEdit ? 'Editar transação' : 'Cadastrar transação'
    const description = isEdit
      ? 'Edite os dados da transação'
      : 'Insira os dados para nova transação'
    const buttonOpen = isEdit ? (
      <button className="absolute top-auto right-14 hover:bg-gray-100 p-1 rounded-lg">
        <Pencil size={20} />
      </button>
    ) : (
      <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring py-3 px-8 rounded-md text-white font-bold">
        Nova transação
      </button>
    )

    return {
      title,
      description,
      buttonOpen
    }
  }, [])

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

  const updateTransaction = useCallback(
    async (transaction: TransactionDataAPI) => {
      try {
        setLoading(true)
        await mainTransaction.handleUpdateTransaction(
          transaction.id,
          transaction
        )
      } catch (error) {
        alert('Erro ao editar a transação')
      } finally {
        setLoading(false)
      }
    },
    [mainTransaction, setLoading]
  )

  const deleteTransaction = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        await mainTransaction.handleDeleteTransaction(id)
      } catch (error) {
        alert('Erro ao deletar transação')
      } finally {
        setLoading(false)
      }
    },
    [mainTransaction, setLoading]
  )

  const listTransactions = useCallback(async () => {
    try {
      setLoading(true)
      await mainTransaction.handleListTransactions()
    } catch (error) {
      alert('Erro ao listar transações')
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenModalTransaction = useCallback(() => {
    setOpen(true)
  }, [])

  const handleCloseModalTransaction = useCallback(() => {
    setIsEdit(false)
    setOpen(false)
  }, [])

  const handleOpenModalTransactionToEdit = useCallback(
    (transaction: TransactionDataAPI) => {
      setIsEdit(true)

      methods.setValue('id', transaction.id)
      methods.setValue('name', transaction.name)
      methods.setValue('amount', String(transaction.amount))
      methods.setValue('type', transaction.type)
      methods.setValue('category', transaction.category)

      handleOpenModalTransaction()
    },
    [handleOpenModalTransaction, methods]
  )

  console.log('methods: ', methods.getValues('type'))

  const onSubmit = async (data: DataForm) => {
    if (isEdit) {
      const { name, amount, category, type } = data

      const obj = {
        id: methods.getValues().id,
        name,
        amount: Number(amount),
        type,
        category,
        date: new Date().toISOString()
      }

      await updateTransaction(obj)

      methods.reset()
      handleCloseModalTransaction()
      return
    }

    try {
      setLoading(true)
      const { name, amount, type, category } = data

      const obj = {
        name,
        amount: Number(amount),
        type,
        category,
        date: new Date().toISOString()
      }

      const response = await mainTransaction.handleCreateTransaction(obj)

      if (response.status === 200) {
        methods.reset()
        return
      }
    } catch (error) {
      alert('Erro, ao cadastrar transação!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void listTransactions()
  }, [listTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        loading,
        setLoading,
        make,
        methods,
        onSubmit,
        mainTransaction,
        deleteTransaction,
        updateTransaction,
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
