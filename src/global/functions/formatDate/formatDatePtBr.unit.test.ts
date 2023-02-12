import { formatDatePtBr } from './formatDatePtBr'

describe('formatDatePtBr', () => {
  it('should return a date formatted in pt-BR', () => {
    const date = '2021-04-01T00:00:00.000Z'
    const formatDate = formatDatePtBr(date)
    expect(formatDate).toBe('01/04/2021 00:00')
  })

  it('should return a string empty in case the date does not exist', () => {
    const date = ''
    const formatDate = formatDatePtBr(date)
    expect(formatDate).toBe('')
  })
})
