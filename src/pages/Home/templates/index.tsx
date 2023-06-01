import {
  SectionCardsTransactions,
  SectionCardsTransactionsTypes
} from './SectionCardsTransactionsTypes'
import {
  SectionListTransactions,
  SectionListTransactionsTypes
} from './SectionListTransactions'
import { Main } from './Main'
import { Header, HeaderTypes } from './Header'
import { Container } from './Container'

export type HomeTemplateUITypes = {
  header: HeaderTypes
  sectionCardsTransactions: SectionCardsTransactionsTypes
  sectionListTransactions: SectionListTransactionsTypes
}

export function HomeTemplateUI(props: HomeTemplateUITypes) {
  return (
    <Container>
      <Header {...props.header} />
      <Main>
        <SectionCardsTransactions {...props.sectionCardsTransactions} />
        <SectionListTransactions {...props.sectionListTransactions} />
      </Main>
    </Container>
  )
}
