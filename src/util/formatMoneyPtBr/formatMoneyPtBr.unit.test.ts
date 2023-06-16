import { formatMoneyPtBr } from './formatMoneyPtBr'

describe('formatMoneyPtBr', () => {
  it('should format value', () => {
    const result = formatMoneyPtBr(1000)
    expect(result).toBe('R$ 10,00')
  })

  it('should format value with decimal', () => {
    const result = formatMoneyPtBr(1001)
    expect(result).toBe('R$ 10,01')
  })
})
