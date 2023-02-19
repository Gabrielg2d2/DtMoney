import { DeleteTransactionTypes } from '../../types'

export async function deleteTransaction({
  setLoading,
  mainTransactionDelete,
  id
}: DeleteTransactionTypes) {
  try {
    setLoading(true)
    await mainTransactionDelete(id)
  } catch (error) {
    alert('Erro ao deletar transação')
  } finally {
    setLoading(false)
  }
}
