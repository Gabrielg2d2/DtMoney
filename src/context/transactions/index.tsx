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

// Transactions - trocar pelo nome correto do contexto

type DataForm = {
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
  make: () => {
    title: string
    description: string
    buttonOpen: JSX.Element
  }
  methods: UseFormReturn<DataForm, any>
  onSubmit: (data: DataForm) => Promise<void>
  mainTransaction: typeof MainTransaction
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
      { message: 'O valor deve ser maior que 0' }
    ),
  type: z.string().min(1, { message: 'Obrigatório' }),
  category: z.string().min(1, { message: 'Obrigatório' })
})

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsType) {
  const mainTransaction = MainTransaction
  const [loading, setLoading] = useState(false)

  const make = useCallback((isEdit = false) => {
    const title = isEdit ? 'Editar transação' : 'Cadastrar transação'
    const description = isEdit
      ? 'Edite os dados da transação'
      : 'Insira os dados para nova transação'
    const buttonOpen = isEdit ? (
      <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring py-3 px-8 rounded-md text-white font-bold">
        Editar transação
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
      name: '',
      amount: '',
      type: 'withdrawn',
      category: ''
    },
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: DataForm) => {
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

    alert('Erro, ao cadastrar transação!')
  }

  const listTransactions = useCallback(async () => {
    setLoading(true)
    await mainTransaction.handleListTransactions()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        mainTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  return useContext(TransactionsContext)
}
