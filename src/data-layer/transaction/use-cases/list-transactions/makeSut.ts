import { ListTransactions } from '.'

type SutTypes = {
  url?: string
  methodGet?: jest.Mock
}

export const makeSutListTransactions = (params?: SutTypes) => {
  const urlSpy = params?.url || 'url_any'
  const methodGetSpy =
    params?.methodGet ||
    jest.fn().mockResolvedValue({
      status: 200,
      data: [
        {
          id: 'any_id',
          name: 'any_name',
          amount: 10,
          type: 'deposit',
          category: 'any_category',
          date: '2021-05-01T00:00:00.000Z'
        }
      ]
    })

  const sut = new ListTransactions(urlSpy, methodGetSpy)

  return {
    sut,
    urlSpy,
    methodGetSpy
  }
}
