import { DialogCustom } from '../Dialog'
import { Input } from '../Input'
import { useState } from 'react'
import { Form } from './Form'
import { SelectedCategory } from './SelectedCategory'
import { Submit } from './Submit'
import { useForm } from 'react-hook-form'
import { InputMoney } from '../InputMoney'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type DialogNewTransactionTypes = {
  handleSubmit: (data: any) => void
}

export type FormTypes = {
  name: string
  amount: string
  category: string
  type: string
}

export function DialogNewTransaction({
  handleSubmit
}: DialogNewTransactionTypes) {
  const [openModalTransaction, setOpenModalTransaction] = useState(false)

  function handleCloseModalTransaction() {
    setOpenModalTransaction(false)
  }

  function handleOpenModalTransaction() {
    setOpenModalTransaction(true)
  }

  const schema = zod.object({
    amount: zod
      .string({
        description: 'Obrigatório'
      })
      .refine(
        (value) => {
          const isDecimal = /^-?[0-9]+(\.[0-9]+)?$/.test(value)
          return isDecimal
        },
        {
          message: 'Insira um valor monetário válido'
        }
      ),
    category: zod
      .string({
        description: 'Obrigatório'
      })
      .min(3, 'Mínimo 3 caracteres'),
    type: zod.string(),
    name: zod
      .string({
        description: 'Obrigatório'
      })
      .min(3, 'Mínimo 3 caracteres')
  })
  const method = useForm<FormTypes>({
    defaultValues: {
      name: '',
      amount: '',
      category: '',
      type: 'deposit'
    },
    resolver: zodResolver(schema)
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
        title="Nova transação"
        description="
        Preencha os campos abaixo para adicionar uma nova transação.
      "
        open={openModalTransaction}
        close={handleCloseModalTransaction}
      >
        <Form onSubmit={method.handleSubmit(onSubmit)}>
          <Input
            placeholder="Nome"
            register={method.register('name')}
            error={!!method.formState.errors.name?.message}
            message={method.formState.errors.name?.message}
          />
          <InputMoney
            name="amount"
            placeholder="Preço"
            onChangeValueMoney={(value) => {
              method.setValue('amount', value)
            }}
            error={!!method.formState.errors.amount?.message}
            message={method.formState.errors.amount?.message}
          />
          <SelectedCategory
            outInput={(value) => {
              method.setValue('type', value)
            }}
          />
          <Input
            placeholder="Categoria"
            register={method.register('category')}
            error={!!method.formState.errors.category?.message}
            message={method.formState.errors.category?.message}
          />
          <Submit />
        </Form>
      </DialogCustom>
    </>
  )
}
