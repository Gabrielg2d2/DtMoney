import { act, render, screen } from '@testing-library/react'
import { ListTransactions } from '.'

describe('ListTransactions', () => {
  const mockDeleteTransaction = jest.fn()
  const mockOpenModalTransactionToEdit = jest.fn()

  it('should render component ListTransactions', () => {
    render(
      <ListTransactions
        handleDeleteTransaction={mockDeleteTransaction}
        handleOpenModalTransactionToEdit={mockOpenModalTransactionToEdit}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'deposit',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            createdAt: '2021-03-01T00:00:00.000Z'
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
        handleDeleteTransaction={mockDeleteTransaction}
        handleOpenModalTransactionToEdit={mockOpenModalTransactionToEdit}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'deposit',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            createdAt: '2021-03-01T00:00:00.000Z'
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
        handleDeleteTransaction={mockDeleteTransaction}
        handleOpenModalTransactionToEdit={mockOpenModalTransactionToEdit}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'deposit',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            createdAt: '2021-03-01T00:00:00.000Z'
          }
        ]}
      />
    )

    expect(screen.getByText('Jest_Name')).toBeInTheDocument()
  })

  it('should render component ListTransactions with list and type withdrawn', () => {
    render(
      <ListTransactions
        handleDeleteTransaction={mockDeleteTransaction}
        handleOpenModalTransactionToEdit={mockOpenModalTransactionToEdit}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'withdrawn',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            createdAt: '2021-03-01T00:00:00.000Z'
          }
        ]}
      />
    )

    expect(screen.getByText('Jest_Name')).toBeInTheDocument()
  })

  it('should render component ListTransactions with array empty', () => {
    render(
      <ListTransactions
        handleDeleteTransaction={mockDeleteTransaction}
        handleOpenModalTransactionToEdit={mockOpenModalTransactionToEdit}
        list={[]}
      />
    )

    expect(screen.getByText('Nenhuma transação encontrada')).toBeInTheDocument()
  })

  it('should render component ListTransactions with button of icon delete transaction', () => {
    render(
      <ListTransactions
        handleDeleteTransaction={mockDeleteTransaction}
        handleOpenModalTransactionToEdit={mockOpenModalTransactionToEdit}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'withdrawn',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            createdAt: '2021-03-01T00:00:00.000Z'
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
        handleDeleteTransaction={mockDeleteTransaction}
        handleOpenModalTransactionToEdit={mockOpenModalTransactionToEdit}
        list={[
          {
            id: '1',
            name: 'Jest_Name',
            type: 'withdrawn',
            category: 'Jest_Category',
            amount: 10,
            date: '2021-03-01T00:00:00.000Z',
            createdAt: '2021-03-01T00:00:00.000Z'
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
