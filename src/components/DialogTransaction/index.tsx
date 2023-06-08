import { DialogCustom } from '../Dialog'
import { Input } from '../Input'
import { useState } from 'react'
import { Form } from './Form'
import { SelectedCategory } from './SelectedCategory'
import { Submit } from './Submit'

type DialogTransactionTypes = {
  title: string
  description: string
  handleSubmit: () => void
}

export function DialogTransaction({
  title,
  description,
  handleSubmit
}: DialogTransactionTypes) {
  const [openModalTransaction, setOpenModalTransaction] = useState(false)

  function handleCloseModalTransaction() {
    setOpenModalTransaction(false)
  }

  function handleOpenModalTransaction() {
    setOpenModalTransaction(true)
  }

  return (
    <>
      <button
        onClick={handleOpenModalTransaction}
        className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring py-3 px-8 rounded-md text-white font-bold"
      >
        Nova transação
      </button>

      <DialogCustom
        title={title}
        description={description}
        open={openModalTransaction}
        close={handleCloseModalTransaction}
      >
        <Form handleSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" />
          <Input name="amount" placeholder="Preço" />
          <SelectedCategory outInput={() => {}} />
          <Input name="category" placeholder="Categoria" />
          <Submit />
        </Form>
      </DialogCustom>
    </>
  )
}
