import { render, screen } from '@testing-library/react'
import { Home } from '.'

describe('Home', () => {
  it('should render component Home', () => {
    render(<Home />)

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

  it('should render component Cards with texts Entradas, Saídas, Total', () => {
    render(<Home />)

    expect(screen.getByText('Entradas')).toBeInTheDocument()
    expect(screen.getByText('Saídas')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()

    expect(screen.getByTestId('card_incoming_value')).toHaveTextContent(
      'R$0,00'
    )
    expect(screen.getByTestId('card_outgoing_value')).toHaveTextContent(
      'R$0,00'
    )
    expect(screen.getByTestId('card_total_value')).toHaveTextContent('R$0,00')
  })
})
