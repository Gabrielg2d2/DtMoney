import { formatMoneyBrToNumber } from './formatMoneyBrToNumber'

describe('formatMoneyBrToNumber', () => {
  it('should return a number', () => {
    const money = 'R$ 1.000,00'
    const formatMoney = formatMoneyBrToNumber(money)
    expect(formatMoney).toBe(1000)
  })

  it('should return a number', () => {
    const money = 'R$ 1.000,23'
    const formatMoney = formatMoneyBrToNumber(money)
    expect(formatMoney).toBe(1000.23)
  })

  it('should return a number', () => {
    const money = 'R$ 500,23'
    const formatMoney = formatMoneyBrToNumber(money)
    expect(formatMoney).toBe(500.23)
  })

  it('should return a number million', () => {
    const money = 'R$ 8.425.150,23'
    const formatMoney = formatMoneyBrToNumber(money)

    expect(formatMoney).toBe(8425150.23)
  })

  it('should return a number billion', () => {
    const money = 'R$ 8.425.150.000,23'
    const formatMoney = formatMoneyBrToNumber(money)

    expect(formatMoney).toBe(8425150000.23)
  })

  it('should return a number trillion', () => {
    const money = 'R$ 8.425.150.000.000,23'
    const formatMoney = formatMoneyBrToNumber(money)

    expect(formatMoney).toBe(8425150000000.23)
  })
})
