export type DataTransactionProps = {
  id: string
  name: string
  amount: number
  type: string
  category: string
  date: string
}

export type ListTransactionsReturn = {
  status: number
  data: DataTransactionProps[]
}
