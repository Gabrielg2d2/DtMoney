import { deleteTransaction } from '.'

describe('deleteTransaction', () => {
  const setLoading = jest.fn()
  const id = 'id_jest'

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

  it('should call setLoading with true and false', async () => {
    const { mainTransactionSpy } = makeSutMainTransaction()

    await deleteTransaction({
      setLoading,
      mainTransaction: mainTransactionSpy,
      id
    })

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })

  it('should throw if mainTransaction.handleDeleteTransaction throws', async () => {
    const { mainTransactionSpy } = makeSutMainTransaction()

    jest
      .spyOn(mainTransactionSpy, 'handleDeleteTransaction')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    await expect(
      deleteTransaction({
        setLoading,
        mainTransaction: mainTransactionSpy,
        id
      })
    ).rejects.toThrow()
  })
})
