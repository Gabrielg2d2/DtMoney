import { useCallback, useState } from 'react'

export function useDialogNewTransaction() {
  const [isEdit] = useState(false)
  const [type, setType] = useState('withdrawn')

  const handleType = useCallback((type: string) => {
    setType(type)
  }, [])

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

  return {
    isEdit,
    type,
    handleType,
    make
  }
}
