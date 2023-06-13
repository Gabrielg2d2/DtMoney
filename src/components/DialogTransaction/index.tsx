import { DialogCustom } from '../Dialog'
import { Input } from '../Input'
import { useState } from 'react'
import { Form } from './Form'
import { SelectedCategory } from './SelectedCategory'
import { Submit } from './Submit'
import { useForm } from 'react-hook-form'

type DialogTransactionTypes = {
  title: string
  description: string
  handleSubmit: (data: any) => void
}

export type FormTypes = {
  name: string
  amount: string
  category: string
  type: string
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

  const method = useForm<FormTypes>({
    defaultValues: {
      name: '',
      amount: '',
      category: '',
      type: 'deposit'
    }
  })

  function onSubmit(data: FormTypes) {
    handleSubmit(data)
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
        <Form onSubmit={method.handleSubmit(onSubmit)}>
          <Input placeholder="Nome" register={method.register('name')} />
          <Input placeholder="Preço" register={method.register('amount')} />
          <SelectedCategory
            outInput={(value) => {
              method.setValue('type', value)
            }}
          />
          <Input
            placeholder="Categoria"
            register={method.register('category')}
          />
          <Submit />
        </Form>
      </DialogCustom>
    </>
  )
}
