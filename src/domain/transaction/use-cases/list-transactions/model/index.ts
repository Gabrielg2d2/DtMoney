import {
  TransactionDataAPI,
  TransactionDataAPIFormat
} from '@/domain/transaction/types/global/transactions'

export type DataTransactionProps = TransactionDataAPI

export type DataTransactionFormatProps = TransactionDataAPIFormat

export type ListTransactionsReturn = {
  status: number
  data: DataTransactionProps[]
}
