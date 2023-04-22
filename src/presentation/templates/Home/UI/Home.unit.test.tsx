import { render, screen } from '@testing-library/react'
import { HomeTemplateUI } from '.'

describe('HomeTemplate', () => {
  it('should render component HomeTemplate', () => {
    render(
      <HomeTemplateUI
        mainTransaction={{
          url: '/transactions',
          transactions: [],
          totalIncomingTransactions: 'R$0,00',
          totalOutgoingTransactions: 'R$0,00',
          totalTransactions: 'R$0,00'
        }}
        handleDeleteTransaction={async () => {
          await Promise.resolve()
        }}
        handleOpenModalTransaction={() => {}}
        handleOpenModalTransactionToEdit={() => {}}
        loading={false}
      />
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

  it('should render component Cards with texts Entradas, Saídas, Total', () => {
    render(
      <HomeTemplateUI
        mainTransaction={{
          url: '/transactions',
          transactions: [],
          totalIncomingTransactions: 'R$0,00',
          totalOutgoingTransactions: 'R$0,00',
          totalTransactions: 'R$0,00'
        }}
        handleDeleteTransaction={async () => {
          await Promise.resolve()
        }}
        handleOpenModalTransaction={() => {}}
        handleOpenModalTransactionToEdit={() => {}}
        loading={false}
      />
    )

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
