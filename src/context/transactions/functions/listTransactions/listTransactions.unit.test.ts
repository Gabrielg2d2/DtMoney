import { listTransactions } from '.'

const makeSutMainTransaction = () => {
  class MainTransactionSpy {
    handleFormatDate = jest.fn()
    handleFormatMoneyPtBr = jest.fn()
    handleTotalTransactions = jest.fn()
    handleTotalIncomingTransactions = jest.fn()
    handleTotalOutgoingTransactions = jest.fn()
    handleListTransactions = jest.fn()
    handleCreateTransaction = jest.fn()
    handleDeleteTransaction = jest.fn()
    handleUpdateTransaction = jest.fn()

    url = ''
    transactions = []
    totalTransactions = 'R$0,00'
    totalIncomingTransactions = 'R$0,00'
    totalOutgoingTransactions = 'R$0,00'
  }
  const mainTransactionSpy = new MainTransactionSpy()

  const setLoadingSpy = jest.fn()

  return {
    mainTransactionSpy,
    setLoadingSpy
  }
}

describe('listTransactions', () => {
  const { mainTransactionSpy, setLoadingSpy } = makeSutMainTransaction()

  it('should call handleListTransactions', async () => {
    await listTransactions({
      setLoading: setLoadingSpy,
      mainTransaction: mainTransactionSpy
    })

    expect(mainTransactionSpy.handleListTransactions).toHaveBeenCalled()
  })

  it('should call setLoading', async () => {
    await listTransactions({
      setLoading: setLoadingSpy,
      mainTransaction: mainTransactionSpy
    })
    expect(setLoadingSpy).toHaveBeenCalled()
    expect(setLoadingSpy).toHaveBeenCalledTimes(2)
    expect(setLoadingSpy).toHaveBeenNthCalledWith(1, true)
    expect(setLoadingSpy).toHaveBeenNthCalledWith(2, false)
  })
})
