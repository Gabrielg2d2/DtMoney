import { render, screen } from '@testing-library/react'
import { Input } from '.'

describe('Input', () => {
  it('render component Input', () => {
    render(<Input placeholder="Jest Test" />)

    screen.getByPlaceholderText('Jest Test')
  })
})
