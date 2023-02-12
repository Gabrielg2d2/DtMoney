import { HandleOpenModalTransactionToEditTypes } from '../../types'

export function openModalEdit({
  transaction,
  setIsEdit,
  methods,
  handleOpenModalTransaction
}: HandleOpenModalTransactionToEditTypes) {
  setIsEdit(true)

  methods.setValue('id', transaction.id)
  methods.setValue('name', transaction.name)
  methods.setValue('amount', String(transaction.amount))
  methods.setValue('type', transaction.type)
  methods.setValue('category', transaction.category)

  handleOpenModalTransaction()
}
