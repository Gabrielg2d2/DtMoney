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
import { formatMoneyPtBr } from '@/global/functions/formatMoneyPtBr/formatMoneyPtBr'
import { formatDatePtBr } from '@/global/functions/formatDate/formatDatePtBr'

class Main {
  url = '/transactions'

  transactions = []
  totalIncomingTransactions = 'R$0,00'
  totalOutgoingTransactions = 'R$0,00'
  totalTransactions = 'R$0,00'

  handleFormatDate(date: string) {
    const formatDate = formatDatePtBr(date)

    return formatDate
  }

  handleFormatMoneyPtBr(value: number) {
    const formatMoney = formatMoneyPtBr(value)

    return formatMoney
  }

  handleTotalTransactions(transactions: TransactionDataAPI[]) {
    const totalTransactions = new TotalTransactions()
    const total = totalTransactions.filterTotalTransactions(transactions)
    this.totalTransactions = this.handleFormatMoneyPtBr(total)
    return this.handleFormatMoneyPtBr(total)
  }

  handleTotalIncomingTransactions(transactions: TransactionDataAPI[]) {
    const totalIncomingTransactions = new TotalIncomingTransactions()
    const total =
      totalIncomingTransactions.filterTotalIncomingTransactions(transactions)
    this.totalIncomingTransactions = this.handleFormatMoneyPtBr(total)
    return this.handleFormatMoneyPtBr(total)
  }

  handleTotalOutgoingTransactions(transactions: TransactionDataAPI[]) {
    const totalOutgoingTransactions = new TotalOutgoingTransactions()
    const total =
      totalOutgoingTransactions.filterTotalOutgoingTransactions(transactions)
    this.totalOutgoingTransactions = this.handleFormatMoneyPtBr(total)
    return this.handleFormatMoneyPtBr(total)
  }

  async handleListTransactions() {
    const listTransactions = new ListTransactions(this.url, api.get)

    const response = await listTransactions.execute()

    const responseFormat = response.data.map(
      (transaction: TransactionDataAPI) => {
        return {
          ...transaction,
          dateFormatted: this.handleFormatDate(transaction.date),
          amountFormatted: this.handleFormatMoneyPtBr(transaction.amount)
        }
      }
    )

    const totalTransactions = this.handleTotalTransactions(response.data)
    const totalIncomingTransactions = this.handleTotalIncomingTransactions(
      response.data
    )
    const totalOutgoingTransactions = this.handleTotalOutgoingTransactions(
      response.data
    )

    this.transactions = responseFormat

    return {
      status: response.status,
      data: responseFormat,
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

      this.transactions = responseUpdateListTransaction.data
      this.totalIncomingTransactions =
        responseUpdateListTransaction.totalIncomingTransactions
      this.totalOutgoingTransactions =
        responseUpdateListTransaction.totalOutgoingTransactions
      this.totalTransactions = responseUpdateListTransaction.totalTransactions

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

      this.transactions = responseUpdateListTransaction.data
      this.totalIncomingTransactions =
        responseUpdateListTransaction.totalIncomingTransactions
      this.totalOutgoingTransactions =
        responseUpdateListTransaction.totalOutgoingTransactions
      this.totalTransactions = responseUpdateListTransaction.totalTransactions

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

      this.transactions = responseUpdateListTransaction.data
      this.totalIncomingTransactions =
        responseUpdateListTransaction.totalIncomingTransactions
      this.totalOutgoingTransactions =
        responseUpdateListTransaction.totalOutgoingTransactions
      this.totalTransactions = responseUpdateListTransaction.totalTransactions

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

let MainTransaction: Main | null = null

if (!MainTransaction) {
  MainTransaction = new Main()
}

export { MainTransaction }
