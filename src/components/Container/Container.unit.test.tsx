import { render, screen } from '@testing-library/react'
import { Container } from '.'

describe('Container', () => {
  it('should render component Container', () => {
    render(
      <Container>
        <h1>Container</h1>
      </Container>
    )

    expect(screen.getByText('Container')).toBeInTheDocument()
    expect(screen.getByTestId('container_id')).toBeInTheDocument()
  })
})
