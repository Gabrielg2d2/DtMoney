import { render, screen } from '@testing-library/react'
import { Input } from '.'

describe('Input', () => {
  it('should render component Input', () => {
    render(<Input placeholder="Jest Test" />)

    screen.getByPlaceholderText('Jest Test')
  })

  it('should render component Input with errors', () => {
    render(
      <Input
        placeholder="Jest Test"
        name="name"
        errors={{
          name: {
            message: 'Obrigatório',
            type: 'too_small',
            ref: {
              name: 'name',
              type: 'text',
              value: '',
              required: true
            }
          }
        }}
      />
    )

    expect(screen.getByText('Obrigatório')).toBeInTheDocument()
  })
})
