import { AddNewTransaction } from '.'

type SutTypes = {
  url?: string
  methodPost?: jest.Mock
  status?: number
}

export const makeSutAddNewTransaction = (params?: SutTypes) => {
  const dataSpy = {
    name: 'any_name',
    amount: 100,
    type: 'deposit',
    category: 'any_category',
    date: '2021-05-01T00:00:00.000Z'
  }

  const url = params?.url || 'any_url'
  const methodPost =
    params?.methodPost || jest.fn().mockResolvedValue({ status: 200 })

  return {
    sut: new AddNewTransaction(url, methodPost),
    urlSpy: url,
    methodPostSpy: methodPost,
    dataSpy
  }
}
