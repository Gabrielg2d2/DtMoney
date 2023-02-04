import { render, screen } from '@testing-library/react'
import { Home } from '.'
import { TransactionsProvider } from '@/context/transactions'

describe('Home', () => {
  it('should render component Home', () => {
    render(
      <TransactionsProvider>
        <Home />
      </TransactionsProvider>
    )

    expect(screen.getByText(/dt money/i)).toBeInTheDocument()
    expect(screen.getByText('Nova transação')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Nova transação/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/nenhuma transação encontrada/i)
    ).toBeInTheDocument()
  })
})
