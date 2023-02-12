import { DataForm, MethodsTypes, SetLoadingTypes } from '../../types'
import { UpdateTypes } from '../../functions/updateTransaction'
import { Main } from '@/data-layer/transaction/main/main'

type HandleSubmitType = {
  data: DataForm
  isEdit: boolean
  methods: MethodsTypes
  mainTransaction: Main
  handleCloseModalTransaction: () => void
  setLoading: SetLoadingTypes
  updateTransaction: ({
    transaction,
    mainTransaction,
    setLoading
  }: UpdateTypes) => Promise<void>
}

export async function handleSubmit({
  isEdit,
  data,
  methods,
  mainTransaction,
  setLoading,
  handleCloseModalTransaction,
  updateTransaction
}: HandleSubmitType) {
  if (isEdit) {
    setLoading(true)
    try {
      const { name, amount, category, type } = data

      const obj = {
        id: methods.getValues().id,
        name,
        amount: Number(amount),
        type,
        category,
        date: new Date().toISOString()
      }

      await updateTransaction({
        transaction: obj,
        mainTransaction,
        setLoading
      })

      methods.reset()
      handleCloseModalTransaction()
      return
    } catch (error) {
      alert('Erro, ao editar transação!')
    } finally {
      setLoading(false)
    }
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
