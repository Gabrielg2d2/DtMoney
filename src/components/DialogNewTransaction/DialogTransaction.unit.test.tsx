import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { DialogTransaction } from '.'
import { TransactionsProvider } from '@/context/transactions'

describe('DialogTransaction', () => {
  it('should render component DialogTransaction open, with the form', () => {
    render(
      <TransactionsProvider>
        <DialogTransaction open close={() => {}} />
      </TransactionsProvider>
    )

    expect(screen.getByText(/cadastrar transação/i)).toBeInTheDocument()
    expect(
      screen.getByText(/insira os dados para nova transação/i)
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/preço/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/categoria/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /cadastrar/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /entrada/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /saída/i
      })
    ).toBeInTheDocument()
  })

  it('should allow closing the modal when clicking on the "x" close button', () => {
    render(
      <TransactionsProvider>
        <DialogTransaction open={false} close={() => {}} />
      </TransactionsProvider>
    )

    expect(screen.queryByText(/cadastrar transação/i)).not.toBeInTheDocument()
  })

  it('should render component DialogTransaction with button withdrawn selection default', () => {
    render(
      <TransactionsProvider>
        <DialogTransaction open close={() => {}} />
      </TransactionsProvider>
    )

    const buttonWithdrawn = screen.getByRole('button', {
      name: /saída/i
    })

    const buttonDeposit = screen.getByRole('button', {
      name: /entrada/i
    })

    expect(buttonWithdrawn).toHaveClass('border-red-500')
    expect(buttonDeposit).not.toHaveClass('border-green-500')
  })

  it('should click on the input button, and check if it has been activated, represented with a green border', async () => {
    render(
      <TransactionsProvider>
        <DialogTransaction open close={() => {}} />
      </TransactionsProvider>
    )

    const buttonWithdrawn = screen.getByRole('button', {
      name: /saída/i
    })

    const buttonDeposit = screen.getByRole('button', {
      name: /entrada/i
    })

    act(() => {
      buttonDeposit.click()
    })

    expect(buttonWithdrawn).not.toHaveClass('border-red-500')
    expect(buttonDeposit).toHaveClass('border-green-500')
  })

  it('should click on the exit button, and check if it has been activated, represented with a red border', () => {
    render(
      <TransactionsProvider>
        <DialogTransaction open close={() => {}} />
      </TransactionsProvider>
    )

    const buttonWithdrawn = screen.getByRole('button', {
      name: /saída/i
    })

    const buttonDeposit = screen.getByRole('button', {
      name: /entrada/i
    })

    act(() => {
      buttonWithdrawn.click()
    })

    expect(buttonWithdrawn).toHaveClass('border-red-500')
    expect(buttonDeposit).not.toHaveClass('border-green-500')
  })
})
