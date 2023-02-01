import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type DataForm = {
  name: string
  price: string
  type: string
  category: string
}

const schema = z.object({
  name: z.string().min(1, { message: 'Obrigatório' }),
  price: z.string().min(1, { message: 'Obrigatório' }),
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

  const { register, handleSubmit, watch, setValue } = useForm<DataForm>({
    defaultValues: {
      name: '',
      price: '',
      type: 'withdrawn',
      category: ''
    },
    resolver: zodResolver(schema)
  })

  const handleType = useCallback(
    (type: string) => {
      setValue('type', type)
    },
    [setValue]
  )

  const onSubmit = (data: DataForm) => {
    console.log(data)
  }

  return {
    handleType,
    make,
    register,
    handleSubmit,
    onSubmit,
    watch
  }
}
