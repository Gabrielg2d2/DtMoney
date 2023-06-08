import { api } from '@/service/api'

export async function deleteTransaction(id: string) {
  try {
    const response = await api.delete(`/transactions/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error to delete transaction')
  }
}
