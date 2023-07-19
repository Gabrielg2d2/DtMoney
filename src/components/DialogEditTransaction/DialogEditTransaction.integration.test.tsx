import { render, screen } from '@testing-library/react'
import { DialogEditTransaction } from '.'
import { act } from 'react-dom/test-utils'

type TypeCurrentType = 'deposit' | 'withdrawn'

describe('DialogEditTransaction', () => {
  const makeSut = (typeCurrent: TypeCurrentType = 'deposit') => {
    const transaction = {
      id: '1',
      name: 'test',
      amount: 100,
      amountFormatted: 'R$ 1,00',
      category: 'test',
      type: typeCurrent,
      date: '2023-01-01T00:00:00.000Z',
      dateFormatted: '01/01/2023'
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

  it('should activate the exit button, when clicked', () => {
    const { transaction, closeSpy, handleSubmitSpy } = makeSut()
    render(
      <DialogEditTransaction
        open
        close={closeSpy}
        handleSubmit={handleSubmitSpy}
        transaction={transaction}
      />
    )

    const buttonOutput = screen.getByText(/saída/i)
    const buttonInput = screen.getByText(/entrada/i)

    act(() => {
      buttonOutput.click()
    })

    expect(buttonInput).toHaveClass('border-gray-200')
    expect(buttonOutput).toHaveClass('border-red-500')
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

  it('should activate input button when clicked', () => {
    const { transaction, closeSpy, handleSubmitSpy } = makeSut()
    render(
      <DialogEditTransaction
        open
        close={closeSpy}
        handleSubmit={handleSubmitSpy}
        transaction={transaction}
      />
    )

    const buttonOutput = screen.getByText(/saída/i)
    const buttonInput = screen.getByText(/entrada/i)

    act(() => {
      buttonOutput.click()
    })

    act(() => {
      buttonInput.click()
    })

    expect(buttonInput).toHaveClass('border-green-500')
    expect(buttonOutput).toHaveClass('border-gray-200')
  })
})
