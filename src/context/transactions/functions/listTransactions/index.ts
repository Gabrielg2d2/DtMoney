import { ListTransactionsTypes } from '../../types'

export async function listTransactions({
  setLoading,
  mainTransaction
}: ListTransactionsTypes) {
  try {
    setLoading(true)
    await mainTransaction.handleListTransactions()
  } catch (error) {
    throw new Error('error function listTransactions')
  } finally {
    setLoading(false)
  }
}
