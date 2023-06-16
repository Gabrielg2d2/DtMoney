import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format date', () => {
    expect(formatDate('2023-01-01T00:00:00.000')).toBe('01/01/2023')
  })

  it('should throw if invalid date', () => {
    expect(() => formatDate('')).toThrow(new Error('Invalid date'))
  })
})
