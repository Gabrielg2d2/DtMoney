import { DeleteTransactionTypes } from '../../types'

export async function deleteTransaction({
  setLoading,
  mainTransaction,
  id
}: DeleteTransactionTypes) {
  try {
    setLoading(true)
    await mainTransaction.handleDeleteTransaction(id)
  } catch (error) {
    alert('Erro ao deletar transação')
  } finally {
    setLoading(false)
  }
}
