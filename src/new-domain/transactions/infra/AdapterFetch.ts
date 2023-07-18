import { IAdapterApi } from './IAdapterApi'

export class AdapterFetch implements IAdapterApi {
  async getApi<T>(url: string) {
    const response = await fetch(`http://localhost:3333${url}`)
    const data = (await response.json()) as T
    return {
      data
    }
  }

  async postApi<T>(url: string, body: any) {
    const response = await fetch(`http://localhost:3333${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = (await response.json()) as T
    return {
      data
    }
  }

  async putApi<T>(url: string, body: any) {
    const response = await fetch(`http://localhost:3333${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = (await response.json()) as T
    return {
      data
    }
  }

  async deleteApi<T>(url: string) {
    const response = await fetch(`http://localhost:3333${url}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = (await response.json()) as T
    return {
      data
    }
  }
}
