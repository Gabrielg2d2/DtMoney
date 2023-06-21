import { render, screen } from '@testing-library/react'
import { HomeTemplateUI, HomeTemplateUITypes } from '.'

describe('Home - page', () => {
  const dataHomeTemplate: HomeTemplateUITypes = {
    header: {
      submit: jest.fn()
    },
    sectionCardsTransactions: {
      totalIncomingTransactions: 0,
      totalOutgoingTransactions: 0,
      totalTransactions: 0
    },
    sectionListTransactions: {
      list: [],
      deleteTransaction: jest.fn(),
      submit: jest.fn(),
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
