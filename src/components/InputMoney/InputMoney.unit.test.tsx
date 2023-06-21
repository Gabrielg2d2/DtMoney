import { fireEvent, render, screen } from '@testing-library/react'
import { InputMoney } from '.'

describe('InputMoney', () => {
  it('should be defined', () => {
    render(<InputMoney onChangeValueMoney={jest.fn()} />)
    expect(screen.getByRole('textbox')).toBeDefined()
  })

  it('should be render with value', () => {
    render(<InputMoney valueMoney="1000" onChangeValueMoney={jest.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('R$ 10,00')
  })

  it('should be render with error', () => {
    render(
      <InputMoney
        error
        message="Error message"
        onChangeValueMoney={jest.fn()}
      />
    )
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('should be render and call function onChangeValueMoney', () => {
    const onChangeValueMoney = jest.fn()
    render(<InputMoney onChangeValueMoney={onChangeValueMoney} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: '1000' } })

    expect(onChangeValueMoney).toBeCalledTimes(1)
    expect(onChangeValueMoney).toBeCalledWith('1000')
  })
})
