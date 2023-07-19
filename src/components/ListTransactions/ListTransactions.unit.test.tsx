import { act, render, screen } from '@testing-library/react'
import { ListTransactions } from '.'

describe('ListTransactions', () => {
  const mockDeleteTransaction = jest.fn()
  const mockSubmit = jest.fn()

  it('should render component ListTransactions', () => {
    render(
      <ListTransactions
        submit={mockSubmit}
        deleteTransaction={mockDeleteTransaction}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'deposit',
            category: 'Jest_Category',
            amount: 1000,
            date: '2021-03-01T00:00:00.000Z',
            amountFormatted: 'R$ 10,00',
            dateFormatted: '01/03/2021'
          }
        ]}
      />
    )

    expect(screen.getByTestId('header_list_transactions')).toBeInTheDocument()
    expect(screen.getByTestId('list_transactions_id')).toBeInTheDocument()
  })

  it('should render component Header with texts', () => {
    render(
      <ListTransactions
        submit={mockSubmit}
        deleteTransaction={mockDeleteTransaction}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'deposit',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            amountFormatted: 'R$ 10,00',
            dateFormatted: '01/03/2021'
          }
        ]}
      />
    )

    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByText('Preço')).toBeInTheDocument()
    expect(screen.getByText('Categoria')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
  })

  it('should render component ListTransactions with list', () => {
    render(
      <ListTransactions
        submit={mockSubmit}
        deleteTransaction={mockDeleteTransaction}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'deposit',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            amountFormatted: 'R$ 10,00',
            dateFormatted: '01/03/2021'
          }
        ]}
      />
    )

    expect(screen.getByText('Jest_Name')).toBeInTheDocument()
  })

  it('should render component ListTransactions with list and type withdrawn', () => {
    render(
      <ListTransactions
        submit={mockSubmit}
        deleteTransaction={mockDeleteTransaction}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'withdrawn',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            amountFormatted: 'R$ 10,00',
            dateFormatted: '01/03/2021'
          }
        ]}
      />
    )

    expect(screen.getByText('Jest_Name')).toBeInTheDocument()
  })

  it('should render component ListTransactions with array empty', () => {
    render(
      <ListTransactions
        submit={mockSubmit}
        deleteTransaction={mockDeleteTransaction}
        list={[]}
      />
    )

    expect(screen.getByText('Nenhuma transação encontrada')).toBeInTheDocument()
  })

  it('should render component ListTransactions with button of icon delete transaction', () => {
    render(
      <ListTransactions
        submit={mockSubmit}
        deleteTransaction={mockDeleteTransaction}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'withdrawn',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            amountFormatted: 'R$ 10,00',
            dateFormatted: '01/03/2021'
          }
        ]}
      />
    )

    expect(
      screen.getByRole('button', {
        name: /deletar/i
      })
    ).toBeInTheDocument()
  })

  it('should be possible to click the delete transaction button', () => {
    render(
      <ListTransactions
        submit={mockSubmit}
        deleteTransaction={mockDeleteTransaction}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'withdrawn',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            amountFormatted: 'R$ 10,00',
            dateFormatted: '01/03/2021'
          }
        ]}
      />
    )

    const buttonDeleteIcon = screen.getByRole('button', {
      name: /deletar/i
    })

    act(() => {
      buttonDeleteIcon.click()
    })

    expect(mockDeleteTransaction).toHaveBeenCalled()
  })
})
