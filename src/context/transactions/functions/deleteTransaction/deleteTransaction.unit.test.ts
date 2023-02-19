import { deleteTransaction } from '.'
import { MainTransaction } from '@/data-layer/transaction/main/main'

describe('deleteTransaction', () => {
  const setLoading = jest.fn()
  const id = 'id_jest'

  const makeSutMainTransaction = () => {
    const mainTransactionSpy = new MainTransaction()

    return {
      mainTransactionSpy
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
