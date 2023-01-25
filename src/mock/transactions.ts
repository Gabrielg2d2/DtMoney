// eslint-disable-next-line @typescript-eslint/naming-convention
export const dataTransactionsMock = [
  {
    id: 'any_id',
    name: 'any_name',
    amount: 10,
    type: 'withdrawn',
    category: 'any_category',
    date: '2021-05-01T00:00:00.000Z',
    dateFormatted: '01/05/2021',
    amountFormatted: 'R$ 10,00'
  },
  {
    id: 'any_id2',
    name: 'any_name2',
    amount: 200,
    type: 'deposit',
    category: 'any_category2',
    date: '2021-05-01T00:00:00.000Z',
    dateFormatted: '01/05/2021',
    amountFormatted: 'R$ 200,00'
  }
]

export const responseTransactionsMock = {
  status: 200,
  data: [
    {
      id: 'any_id',
      name: 'any_name',
      amount: 10,
      type: 'withdrawn',
      category: 'any_category',
      date: '2021-05-01T00:00:00.000Z',
      dateFormatted: '01/05/2021',
      amountFormatted: 'R$ 10,00'
    },
    {
      id: 'any_id2',
      name: 'any_name2',
      amount: 200,
      type: 'deposit',
      category: 'any_category2',
      date: '2021-05-01T00:00:00.000Z',
      dateFormatted: '01/05/2021',
      amountFormatted: 'R$ 200,00'
    }
  ],
  totalTransactions: 'R$ 190,00',
  totalIncomingTransactions: 'R$ 200,00',
  totalOutgoingTransactions: 'R$ 10,00'
}
