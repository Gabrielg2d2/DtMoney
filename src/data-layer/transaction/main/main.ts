import { api } from '../../../service/api'
import {
  TransactionData,
  TransactionDataAPI
} from '../../../domain/transaction/types/global/transactions'

import {
  ListTransactions,
  AddNewTransaction,
  RemoveTransaction,
  UpdateNewTransactions,
  TotalTransactions,
  TotalIncomingTransactions,
  TotalOutgoingTransactions
} from '../use-cases'

export class MainTransaction {
  url = `${process.env.REACT_APP_API_URL}/transactions`

  handleFormatDate(date: string) {
    const formatDate = new Date(date)
    const format = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    })

    return format.format(formatDate)
  }

  handleFormatMoneyPtBr(value: number) {
    const formatMoney = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return formatMoney.format(value)
  }

  handleTotalTransactions(transactions: TransactionDataAPI[]) {
    const totalTransactions = new TotalTransactions()
    const total = totalTransactions.filterTotalTransactions(transactions)
    return this.handleFormatMoneyPtBr(total)
  }

  handleTotalIncomingTransactions(transactions: TransactionDataAPI[]) {
    const totalIncomingTransactions = new TotalIncomingTransactions()
    const total =
      totalIncomingTransactions.filterTotalIncomingTransactions(transactions)
    return this.handleFormatMoneyPtBr(total)
  }

  handleTotalOutgoingTransactions(transactions: TransactionDataAPI[]) {
    const totalOutgoingTransactions = new TotalOutgoingTransactions()
    const total =
      totalOutgoingTransactions.filterTotalOutgoingTransactions(transactions)
    return this.handleFormatMoneyPtBr(total)
  }

  async handleListTransactions() {
    const listTransactions = new ListTransactions(this.url, api.get)

    const response = await listTransactions.execute()

    const totalTransactions = this.handleTotalTransactions(response.data)
    const totalIncomingTransactions = this.handleTotalIncomingTransactions(
      response.data
    )
    const totalOutgoingTransactions = this.handleTotalOutgoingTransactions(
      response.data
    )

    return {
      data: response.data,
      totalTransactions,
      totalIncomingTransactions,
      totalOutgoingTransactions
    }
  }

  async handleCreateTransaction(data: TransactionData) {
    const addNewTransaction = new AddNewTransaction(this.url, api.post)

    const response = await addNewTransaction.add(data)

    if (response.status === 201) {
      const responseUpdateListTransaction = await this.handleListTransactions()
      return {
        status: response.status,
        ...responseUpdateListTransaction
      }
    }

    return {
      status: 400,
      data: []
    }
  }

  async handleDeleteTransaction(id: string) {
    const deleteTransaction = new RemoveTransaction(api.delete)
    const urlDelete = `${this.url}/${id}`

    const response = await deleteTransaction.removeTransaction(urlDelete)

    if (response.status === 200) {
      const responseUpdateListTransaction = await this.handleListTransactions()
      return {
        status: response.status,
        ...responseUpdateListTransaction
      }
    }

    return {
      status: 400,
      data: []
    }
  }

  async handleUpdateTransaction(id: string, body: TransactionData) {
    const urlUpdate = `${this.url}/${id}`
    const updateTransaction = new UpdateNewTransactions(urlUpdate, api.put)

    const response = await updateTransaction.put(body)

    if (response.status === 200) {
      const responseUpdateListTransaction = await this.handleListTransactions()
      return {
        status: response.status,
        ...responseUpdateListTransaction
      }
    }

    return {
      status: 400,
      data: []
    }
  }
}
