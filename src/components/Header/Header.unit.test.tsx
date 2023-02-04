import { TransactionsProvider } from '@/context/transactions'
import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header', () => {
  it('should render component Header', () => {
    render(
      <TransactionsProvider>
        <Header />
      </TransactionsProvider>
    )
    expect(screen.getByText('dt money')).toBeInTheDocument()
    expect(screen.getByText('Nova transação')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Nova transação' })).toHaveClass(
      'bg-violet-500'
    )
  })
})
