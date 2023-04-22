import { useTransactionsContext } from '@/context/transactions'
import { HomeTemplateUI } from './UI'

export function HomeTemplate() {
  const {
    mainTransaction,
    handleDeleteTransaction,
    handleOpenModalTransaction,
    handleOpenModalTransactionToEdit,
    loading
  } = useTransactionsContext()

  return (
    <HomeTemplateUI
      mainTransaction={mainTransaction}
      handleDeleteTransaction={handleDeleteTransaction}
      handleOpenModalTransaction={handleOpenModalTransaction}
      handleOpenModalTransactionToEdit={handleOpenModalTransactionToEdit}
      loading={loading}
    />
  )
}
