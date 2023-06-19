import { HttpClient } from '@/infra/HttpClient'

export async function deleteTransaction(id: string) {
  try {
    const httpClient = new HttpClient()
    const response = await httpClient.delete(`/transactions/${id}`)
    return response
  } catch (error) {
    throw new Error('Error to delete transaction')
  }
}
