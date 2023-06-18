import { formatDatePtBr } from './formatDatePtBr'

describe('formatDatePtBr', () => {
  it('should return a formatted date', () => {
    const date = '2021-04-01T00:00:00.000Z'
    const formattedDate = '01/04/2021, 00:00'
    expect(formatDatePtBr(date)).toEqual(formattedDate)
  })

  it('should return an empty string if the date is not passed', () => {
    const date = ''
    const formattedDate = ''
    expect(formatDatePtBr(date)).toEqual(formattedDate)
  })
})
