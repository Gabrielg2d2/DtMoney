import { UpdateTypes } from '../../types'

export async function updateTransaction({
  setLoading,
  mainTransaction,
  transaction
}: UpdateTypes) {
  try {
    setLoading(true)
    await mainTransaction.handleUpdateTransaction(transaction.id, transaction)
  } catch (error) {
    alert('Erro ao editar a transação')
  } finally {
    setLoading(false)
  }
}
