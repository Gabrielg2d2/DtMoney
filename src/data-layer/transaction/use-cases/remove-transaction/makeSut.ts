import { RemoveTransaction } from '.'

type SutTypes = {
  methodDeleteTransactionSpy?: any
  urlSpy?: string
  transactionIdSpy?: string
  statusSpy?: number
}

export const makeSutDeleteTransaction = (params?: SutTypes) => {
  const methodDeleteTransactionSpy =
    params?.methodDeleteTransactionSpy ||
    jest.fn().mockResolvedValue({ status: params?.statusSpy || 200 })
  const urlSpy = params?.urlSpy || 'any_url'
  const transactionIdSpy = params?.transactionIdSpy || 'any_transaction_id'
  const sut = new RemoveTransaction(methodDeleteTransactionSpy)

  return {
    sut,
    methodDeleteTransactionSpy,
    urlSpy,
    transactionIdSpy
  }
}
