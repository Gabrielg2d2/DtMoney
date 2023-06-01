import { HomeTemplateUI, HomeTemplateUITypes } from './templates'

export function Home() {
  const dataHomeTemplate: HomeTemplateUITypes = {
    header: {
      handleOpenModalTransaction: () => {}
    },
    sectionCardsTransactions: {
      totalIncomingTransactions: 'R$ 0,00',
      totalOutgoingTransactions: 'R$ 0,00',
      totalTransactions: 'R$ 0,00'
    },
    sectionListTransactions: {
      list: [],
      handleDeleteTransaction: async () => {
        await Promise.resolve()
      },
      handleOpenModalTransactionToEdit: () => {},
      loading: false
    }
  }

  return <HomeTemplateUI {...dataHomeTemplate} />
}
