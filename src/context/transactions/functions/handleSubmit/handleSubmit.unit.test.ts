import { handleSubmit } from '.'

type SutTypes = {
  isEdit?: boolean
  data?: {
    name: string
    amount: string
    type: string
    category: string
  }
  methods?: any
  mainTransaction?: any
  setLoading?: () => void
  handleCloseModalTransaction?: () => void
  updateTransaction?: () => Promise<void>
}

const makeSutHandleSubmit = (props?: SutTypes) => {
  const isEdit = props?.isEdit || false

  const data = props?.data || {
    name: 'Test',
    amount: '100',
    type: 'income',
    category: 'Test'
  }

  const methods =
    props?.methods ||
    ({
      getValues: jest.fn().mockReturnValue({
        id: '123'
      }),
      reset: jest.fn()
    } as any)

  const mainTransaction =
    props?.mainTransaction ||
    ({
      handleCreateTransaction: jest.fn().mockResolvedValueOnce({
        status: 200
      })
    } as any)

  const handleCloseModalTransaction = jest.fn()
  const updateTransaction =
    props?.updateTransaction ||
    jest.fn().mockResolvedValueOnce({
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

describe('handleSubmit new transaction', () => {
  it('should be able to submit a new transaction', async () => {
    const {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    } = makeSutHandleSubmit()

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

  it('should return an error when submitting the data', async () => {
    const {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    } = makeSutHandleSubmit({
      mainTransaction: {
        handleCreateTransaction: jest.fn().mockRejectedValueOnce({
          status: 400
        })
      }
    })

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

describe('handleSubmit edit', () => {
  it('should return an error when submitting the data for edit', async () => {
    const {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    } = makeSutHandleSubmit({
      isEdit: true,
      updateTransaction: jest.fn().mockRejectedValueOnce({
        status: 400
      })
    })

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

  it('should return an success when submitting the data for edit', async () => {
    const {
      isEdit,
      data,
      methods,
      mainTransaction,
      setLoading,
      handleCloseModalTransaction,
      updateTransaction
    } = makeSutHandleSubmit({
      isEdit: true
    })

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

    expect(methods.reset).toHaveBeenCalled()
    expect(handleCloseModalTransaction).toHaveBeenCalled()
  })
})
