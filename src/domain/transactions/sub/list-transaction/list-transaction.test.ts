import { LANGUAGE_PT_BR } from '@/domain/constant/constant'
import { ListTransaction } from './list-transaction'

describe('ListTransaction', () => {
  test('should return array empty', () => {
    const listTransaction = new ListTransaction()
    const transactions = listTransaction.execute([], LANGUAGE_PT_BR)
    expect(transactions).toEqual([])
  })

  test('should return array with one transaction', () => {
    const listTransaction = new ListTransaction()
    const transactions = listTransaction.execute(
      [
        {
          id: '1',
          amount: 100,
          date: '2021-01-01',
          category: 'category',
          type: 'deposit',
          name: 'name'
        }
      ],
      LANGUAGE_PT_BR
    )
    expect(transactions).toEqual([
      {
        id: '1',
        amount: 100,
        amountFormatted: 'R$ 1,00',
        date: '2021-01-01',
        dateFormatted: '01/01/2021',
        category: 'category',
        type: 'deposit',
        name: 'name'
      }
    ])
  })

  test('should return an error in a transaction', () => {
    const listTransaction = new ListTransaction()
    const transactions = listTransaction.execute(
      [
        {
          id: '1',
          amount: 100,
          date: '2021-01-01',
          category: 'category',
          type: 'deposit',
          name: 'name'
        },
        {
          id: '123',
          amount: 0,
          date: '2021-01-01',
          category: 'category',
          type: 'deposit',
          name: 'name'
        }
      ],
      LANGUAGE_PT_BR
    )
    expect(transactions).toEqual([
      {
        id: '1',
        amount: 100,
        amountFormatted: 'R$ 1,00',
        date: '2021-01-01',
        dateFormatted: '01/01/2021',
        category: 'category',
        type: 'deposit',
        name: 'name'
      }
    ])
  })
})
