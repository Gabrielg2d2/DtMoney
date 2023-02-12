import { formatMoneyPtBr } from './formatMoneyPtBr'

describe('formatMoneyPtBr', () => {
  it('should return a string with the value formatted in pt-BR currency', () => {
    const value = 1000

    const result = formatMoneyPtBr(value)

    expect(result).toBe('R$ 1.000,00')
  })
})
