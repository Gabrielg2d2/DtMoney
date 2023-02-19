import { deleteTransaction } from '.'

describe('deleteTransaction', () => {
  const setLoading = jest.fn()
  const id = 'id_jest'
  const mainTransactionSpy = {
    handleDeleteTransaction: jest.fn()
  }
  const mainTransactionErrorSpy = {
    handleDeleteTransaction: jest.fn().mockRejectedValue(new Error('error'))
  }

  it('should call setLoading with true and false', async () => {
    await deleteTransaction({
      setLoading,
      mainTransactionDelete: mainTransactionSpy.handleDeleteTransaction,
      id
    })

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(setLoading).toHaveBeenCalledTimes(2)
  })
  it('should call mainTransaction.handleDeleteTransaction with id', async () => {
    await deleteTransaction({
      setLoading,
      mainTransactionDelete: mainTransactionSpy.handleDeleteTransaction,
      id
    })

    expect(mainTransactionSpy.handleDeleteTransaction).toHaveBeenCalledWith(
      'id_jest'
    )
  })

  it('should call setLoading with true and false and throw error', async () => {
    const response = await deleteTransaction({
      setLoading,
      mainTransactionDelete: mainTransactionErrorSpy.handleDeleteTransaction,
      id
    })

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(setLoading).toHaveBeenCalledTimes(2)

    expect(response).toEqual(new Error('error'))
  })
})
