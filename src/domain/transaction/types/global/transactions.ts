export type TransactionData = {
  name: string
  amount: number
  type: string
  category: string
  date: string
}

export type TransactionDataAPI = {
  id: string
  name: string
  amount: number
  type: string
  category: string
  date: string
}

export type TransactionDataAPIFormat = {
  id: string
  name: string
  amount: number
  type: string
  category: string
  date: string
  dateFormatted: string
  amountFormatted: string
}
