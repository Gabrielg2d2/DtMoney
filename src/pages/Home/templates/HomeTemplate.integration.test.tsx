import { render, screen } from '@testing-library/react'
import { HomeTemplateUI, HomeTemplateUITypes } from '.'

describe('Home - page', () => {
  const dataHomeTemplate: HomeTemplateUITypes = {
    header: {
      submit: async () => {
        await Promise.resolve()
      }
    },
    sectionCardsTransactions: {
      totalIncomingTransactions: 'R$ 0,00',
      totalOutgoingTransactions: 'R$ 0,00',
      totalTransactions: 'R$ 0,00'
    },
    sectionListTransactions: {
      list: [],
      deleteTransaction: async () => {
        await Promise.resolve()
      },
      handleOpenModalTransactionToEdit: () => {},
      loading: false
    }
  }

  it('should render the complete Home template, with all the elements', () => {
    render(<HomeTemplateUI {...dataHomeTemplate} />)

    // Header
    expect(screen.getByText(/nova transação/i)).toBeVisible()
    expect(screen.getByText(/dt money/i)).toBeVisible()
    // SectionCardsTransactions
    expect(screen.getByTestId(/card_outgoing_value/i)).toBeVisible()
    expect(screen.getByTestId(/card_incoming_value/i)).toBeVisible()
    expect(screen.getByTestId(/card_total_value/i)).toBeVisible()
    // SectionListTransactions
    expect(screen.getByText(/nenhuma transação encontrada/i)).toBeVisible()
    expect(screen.queryByTestId('list_transactions_id')).not.toBeInTheDocument()
  })
})
