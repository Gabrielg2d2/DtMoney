import { render, screen } from '@testing-library/react'
import { DialogEditTransaction } from '.'
import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'

type TypeCurrentType = 'deposit' | 'withdrawn'

describe('DialogEditTransaction', () => {
  const makeSut = (typeCurrent: TypeCurrentType = 'deposit') => {
    const transaction: TransactionDataTypes = {
      id: '1',
      name: 'test',
      amount: 100,
      category: 'test',
      type: typeCurrent,
      date: new Date().toISOString()
    }

    const closeSpy = jest.fn()
    const handleSubmitSpy = jest.fn()

    return {
      transaction,
      closeSpy,
      handleSubmitSpy
    }
  }

  it('should be defined', () => {
    expect(DialogEditTransaction).toBeDefined()
  })

  it('should dialog edit with button submit', () => {
    const { transaction, closeSpy, handleSubmitSpy } = makeSut()
    render(
      <DialogEditTransaction
        open
        close={closeSpy}
        handleSubmit={handleSubmitSpy}
        transaction={transaction}
      />
    )
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeVisible()
  })

  it('should dialog with button input and output', () => {
    const { transaction, closeSpy, handleSubmitSpy } = makeSut()
    render(
      <DialogEditTransaction
        open
        close={closeSpy}
        handleSubmit={handleSubmitSpy}
        transaction={transaction}
      />
    )
    expect(screen.getByText(/entrada/i)).toBeVisible()
    expect(screen.getByText(/saída/i)).toBeVisible()
  })

  it('should button input with border green, currently active button', () => {
    const { transaction, closeSpy, handleSubmitSpy } = makeSut()
    render(
      <DialogEditTransaction
        open
        close={closeSpy}
        handleSubmit={handleSubmitSpy}
        transaction={transaction}
      />
    )
    expect(screen.getByText(/entrada/i)).toHaveClass('border-green-500')
  })

  it('should button output with border red, currently active button', () => {
    const { transaction, closeSpy, handleSubmitSpy } = makeSut('withdrawn')
    render(
      <DialogEditTransaction
        open
        close={closeSpy}
        handleSubmit={handleSubmitSpy}
        transaction={transaction}
      />
    )
    expect(screen.getByText(/saída/i)).toHaveClass('border-red-500')
  })
})
