import { ListTransactionsTypes } from '../../types'

export async function listTransactions({
  setLoading,
  mainTransaction
}: ListTransactionsTypes) {
  try {
    setLoading(true)
    await mainTransaction.handleListTransactions()
  } catch (error) {
    alert('Erro ao listar transações')
  } finally {
    setLoading(false)
  }
}
