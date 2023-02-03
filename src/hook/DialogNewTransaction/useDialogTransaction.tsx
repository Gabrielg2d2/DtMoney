import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MainTransaction } from '@/data-layer/transaction/main/main'

type DataForm = {
  name: string
  amount: string
  type: string
  category: string
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

export function useDialogTransaction(isEdit = false) {
  const make = useCallback(() => {
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
  }, [isEdit])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<DataForm>({
    defaultValues: {
      name: '',
      amount: '',
      type: 'withdrawn',
      category: ''
    },
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const handleType = useCallback(
    (type: string) => {
      setValue('type', type)
    },
    [setValue]
  )

  const onSubmit = async (data: DataForm) => {
    const { name, amount, type, category } = data

    const obj = {
      name,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString()
    }

    const mainTransaction = new MainTransaction()

    const response = await mainTransaction.handleCreateTransaction(obj)

    console.log(response)

    if (response.status === 200) {
      reset()
      return
    }

    alert('Erro, ao cadastrar transação!')
  }

  return {
    handleType,
    make,
    register,
    handleSubmit,
    onSubmit,
    watch,
    errors
  }
}
