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
    return new Error('error')
  } finally {
    setLoading(false)
  }
}
