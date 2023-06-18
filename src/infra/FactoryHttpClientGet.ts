import { AdapterAxios } from './AdapterAxios'
import { HttpClientGet } from './HttpClientGet'

export class FactoryHttpClientGet {
  constructor(private readonly url: string, private readonly params: any) {}

  execute() {
    const adapterAxios = new AdapterAxios()
    const httpClientGet = new HttpClientGet(
      this.url,
      this.params,
      adapterAxios.execute
    )
    return httpClientGet
  }
}
