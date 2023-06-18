import { DialogNewTransaction } from './index'

import { act, render, screen } from '@testing-library/react'

describe('DialogNewTransaction', () => {
  test('should be defined', () => {
    expect(DialogNewTransaction).toBeDefined()
  })

  it('should render the component with button open dialog', () => {
    render(<DialogNewTransaction handleSubmit={() => {}} />)

    expect(
      screen.getByRole('button', { name: /nova transação/i })
    ).toBeVisible()
  })

  it('should render the component with dialog open', async () => {
    render(<DialogNewTransaction handleSubmit={() => {}} />)
    const buttonOpenDialog = screen.getByRole('button', {
      name: /nova transação/i
    })

    act(() => {
      buttonOpenDialog.click()
    })

    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('should render the component dialog with form', async () => {
    render(<DialogNewTransaction handleSubmit={() => {}} />)
    const buttonOpenDialog = screen.getByRole('button', {
      name: /nova transação/i
    })

    act(() => {
      buttonOpenDialog.click()
    })

    expect(screen.getByRole('form')).toBeVisible()
  })

  it('should render the component dialog with form and input name', async () => {
    render(<DialogNewTransaction handleSubmit={() => {}} />)
    const buttonOpenDialog = screen.getByRole('button', {
      name: /nova transação/i
    })

    act(() => {
      buttonOpenDialog.click()
    })

    expect(screen.getByPlaceholderText('Nome')).toBeVisible()
    expect(screen.getByPlaceholderText('Preço')).toBeVisible()
    expect(screen.getByPlaceholderText('Categoria')).toBeVisible()
    expect(screen.getByText('Entrada')).toBeVisible()
    expect(screen.getByText('Saída')).toBeVisible()
  })
})
