import axios from 'axios'

export class AdapterAxios {
  async execute(url: string, params?: any) {
    const response = await axios.get(url, params)
    return response.data
  }
}
