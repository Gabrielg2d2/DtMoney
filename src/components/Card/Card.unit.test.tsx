import { render, screen } from '@testing-library/react'
import { CardTotal, CardIncoming, CardOutgoing } from '.'

describe('CardTotal', () => {
  it('should render component CardTotal', () => {
    render(<CardTotal title="Card_Jest_Title" amount={'R$ 100,00'} />)

    expect(screen.getByText('Card_Jest_Title')).toBeInTheDocument()
  })

  it('should render component CardTotal with value', () => {
    render(<CardTotal title="Card_Jest_Title" amount={'R$ 100,00'} />)

    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
  })
})

describe('CardIncoming', () => {
  it('should render component CardIncoming', () => {
    render(<CardIncoming title="Card_Jest_Title" amount={'R$ 100,00'} />)

    expect(screen.getByText('Card_Jest_Title')).toBeInTheDocument()
  })

  it('should render component CardIncoming with value', () => {
    render(<CardIncoming title="Card_Jest_Title" amount={'R$ 0,00'} />)

    expect(screen.getByText('R$ 0,00')).toBeInTheDocument()
  })
})

describe('CardOutgoing', () => {
  it('should render component CardOutgoing', () => {
    render(<CardOutgoing title="Card_Jest_Title" amount={'R$ 100,00'} />)

    expect(screen.getByText('Card_Jest_Title')).toBeInTheDocument()
  })

  it('should render component CardOutgoing with value', () => {
    render(<CardOutgoing title="Card_Jest_Title" amount={'R$ 0,00'} />)

    expect(screen.getByText('R$ 0,00')).toBeInTheDocument()
  })
})
