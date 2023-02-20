import { handleSubmit } from '.'

describe('handleSubmit success', () => {
  const makeSut = () => {
    const isEdit = false

    const data = {
      name: 'Test',
      amount: '100',
      type: 'income',
      category: 'Test'
    }

    const methods = {
      getValues: jest.fn().mockReturnValue({
        id: '123'
      }),
      reset: jest.fn()
    } as any

    const mainTransaction = {
      handleCreateTransaction: jest.fn().mockResolvedValueOnce({
        status: 200
      })
    } as any
    const handleCloseModalTransaction = jest.fn()
    const updateTransaction = jest.fn()
    const setLoading = jest.fn()

    return {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction,
      handleSubmit
    }
  }

  it('should be able to submit a new transaction', async () => {
    const {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    } = makeSut()

    await handleSubmit({
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    })

    expect(methods.reset).toHaveBeenCalled()
    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })
})

describe('handleSubmit failed', () => {
  const makeSut = () => {
    const isEdit = false

    const data = {
      name: 'Test',
      amount: '100',
      type: 'income',
      category: 'Test'
    }

    const methods = {
      getValues: jest.fn().mockReturnValue({
        id: '123'
      }),
      reset: jest.fn()
    } as any

    const mainTransaction = {
      handleCreateTransaction: jest.fn().mockRejectedValueOnce({
        status: 400
      })
    } as any
    const handleCloseModalTransaction = jest.fn()
    const updateTransaction = jest.fn()
    const setLoading = jest.fn()

    return {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction,
      handleSubmit
    }
  }

  it('should return an error when submitting the data', async () => {
    const {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    } = makeSut()

    await expect(
      handleSubmit({
        isEdit,
        data,
        methods,
        mainTransaction,
        setLoading,
        handleCloseModalTransaction,
        updateTransaction
      })
    ).rejects.toThrow('Erro, ao criar transação!')
    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })
})

describe('handleSubmit edit failed', () => {
  const makeSut = () => {
    const isEdit = true

    const data = {
      name: 'Test',
      amount: '100',
      type: 'income',
      category: 'Test'
    }

    const methods = {
      getValues: jest.fn().mockReturnValue({
        id: '123'
      }),
      reset: jest.fn()
    } as any

    const mainTransaction = {
      handleCreateTransaction: jest.fn().mockRejectedValueOnce({
        status: 400
      })
    } as any
    const handleCloseModalTransaction = jest.fn()
    const updateTransaction = jest.fn().mockRejectedValueOnce({
      status: 400
    })
    const setLoading = jest.fn()

    return {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction,
      handleSubmit
    }
  }

  it('should return an error when submitting the data for edit', async () => {
    const {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    } = makeSut()

    await expect(
      handleSubmit({
        isEdit,
        data,
        methods,
        mainTransaction,
        setLoading,
        handleCloseModalTransaction,
        updateTransaction
      })
    ).rejects.toThrow('Erro, ao editar transação!')
    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })
})

describe('handleSubmit edit success', () => {
  const makeSut = () => {
    const isEdit = true

    const data = {
      name: 'Test',
      amount: '100',
      type: 'income',
      category: 'Test'
    }

    const methods = {
      getValues: jest.fn().mockReturnValue({
        id: '123'
      }),
      reset: jest.fn()
    } as any

    const mainTransaction = {
      handleCreateTransaction: jest.fn().mockRejectedValueOnce({
        status: 400
      })
    } as any
    const handleCloseModalTransaction = jest.fn()
    const updateTransaction = jest.fn().mockResolvedValueOnce({
      status: 200
    })
    const setLoading = jest.fn()

    return {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction,
      handleSubmit
    }
  }

  it('should return an success when submitting the data for edit', async () => {
    const {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    } = makeSut()

    await handleSubmit({
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    })

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(handleCloseModalTransaction).toHaveBeenCalled()
  })
})
