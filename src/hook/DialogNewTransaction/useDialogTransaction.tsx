import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

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

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: '',
      price: '',
      type: 'withdrawn',
      category: ''
    }
  })

  const handleType = useCallback(
    (type: string) => {
      setValue('type', type)
    },
    [setValue]
  )

  const onSubmit = (data) => {
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
