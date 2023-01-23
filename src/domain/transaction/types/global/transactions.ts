export type TransactionData = {
  name: string
  amount: number
  type: string
  category: string
}

export type TransactionDataAPI = {
  id: string
} & TransactionData
