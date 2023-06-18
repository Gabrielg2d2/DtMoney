type AdapterApiType<Params, Response> = (
  url: string,
  params?: Params
) => Promise<Response>

export class HttpClientGet<Params, Response> {
  constructor(
    private readonly url: string,
    private readonly params: Params,
    private readonly adapterApi: AdapterApiType<Params, Response>
  ) {}

  async get() {
    try {
      const response = await this.adapterApi(this.url, this.params)
      return response
    } catch (error) {
      throw new Error('Error to get HttpClientGet')
    }
  }
}
