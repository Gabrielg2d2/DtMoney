import { Dispatch, SetStateAction } from 'react'
import { TransactionDataAPI } from '@/domain/transaction/types/global/transactions'
import { UseFormReturn } from 'react-hook-form'
import { MainTransaction } from '@/data-layer/transaction/main/main'

export type DataForm = {
  id?: string
  name: string
  amount: string
  type: string
  category: string
}

export type MethodsTypes = UseFormReturn<DataForm>

export type HandleOpenModalTransactionToEditTypes = {
  transaction: TransactionDataAPI
  setIsEdit: (isEdit: boolean) => void
  methods: MethodsTypes
  handleOpenModalTransaction: () => void
}

export type SetLoadingTypes = Dispatch<SetStateAction<boolean>>

export type DeleteTransactionTypes = {
  id: string
  mainTransaction: MainTransaction
  setLoading: SetLoadingTypes
}

export type ListTransactionsTypes = {
  setLoading: SetLoadingTypes
  mainTransaction: MainTransaction
}

export type UpdateTypes = {
  transaction: TransactionDataAPI
  mainTransaction: MainTransaction
  setLoading: SetLoadingTypes
}
