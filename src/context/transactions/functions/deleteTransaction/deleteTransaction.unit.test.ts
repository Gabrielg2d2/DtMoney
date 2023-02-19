import { deleteTransaction } from '.'

describe('deleteTransaction', () => {
  const setLoading = jest.fn()
  const id = 'id_jest'

  const makeSutMainTransaction = () => {
    const mainTransactionSpy = {
      handleFormatDate: jest.fn(),
      handleFormatMoneyPtBr: jest.fn(),
      handleTotalTransactions: jest.fn(),
      handleTotalIncomingTransactions: jest.fn(),
      handleTotalOutgoingTransactions: jest.fn(),
      handleCreateTransaction: jest.fn(),
      handleUpdateTransaction: jest.fn(),
      handleDeleteTransaction: jest.fn(),
      transactions: [],
      totalTransactions: 0,
      totalIncomingTransactions: 0,
      totalOutgoingTransactions: 0
    }

    return {
      mainTransactionSpy
    }
  }

  it('should call setLoading with true and false', async () => {
    const { mainTransactionSpy } = makeSutMainTransaction()

    await deleteTransaction({
      setLoading,
      mainTransactionDelete: mainTransactionSpy.handleDeleteTransaction,
      id
    })

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })
  it('should call mainTransaction.handleDeleteTransaction with id', async () => {
    const { mainTransactionSpy } = makeSutMainTransaction()

    await deleteTransaction({
      setLoading,
      mainTransactionDelete: mainTransactionSpy.handleDeleteTransaction,
      id
    })

    expect(mainTransactionSpy.handleDeleteTransaction).toHaveBeenCalledWith(
      'id_jest'
    )
  })
})
