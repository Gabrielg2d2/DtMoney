import { formatType } from './formatType'

describe('formatType', () => {
  it('should format type to Entrada when receive deposit', () => {
    const result = formatType('deposit')
    expect(result).toBe('Entrada')
  })

  it('should format type to Saída when receive withdrawn', () => {
    const result = formatType('withdrawn')
    expect(result).toBe('Saída')
  })
})
