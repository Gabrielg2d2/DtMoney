import { DialogCustom } from '../Dialog'
import { Input } from '../Input'
import { Form } from './Form'
import { SelectedCategory } from './SelectedCategory'
import { Submit } from './Submit'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { InputMoney } from '../InputMoney'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionACLType } from '@/domain/transactions/types/transaction-acl'

type DialogEditTransactionTypes = {
  handleSubmit: (data: any) => void
  transaction: TransactionACLType
  open: boolean
  close: () => void
}

type FormTypes = {
  name: string
  amount: string
  category: string
  type: string
}

export function DialogEditTransaction({
  handleSubmit,
  transaction,
  open,
  close
}: DialogEditTransactionTypes) {
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
      name: transaction.name,
      amount: String(transaction.amount),
      category: transaction.category,
      type: transaction.type
    },
    resolver: zodResolver(schema)
  })

  function onSubmit(data: FormTypes) {
    const obj = {
      id: transaction.id,
      name: data.name,
      amount: Number(data.amount),
      category: data.category,
      type: data.type,
      date: new Date().toISOString()
    }
    handleSubmit(obj)
  }

  useEffect(() => {
    method.setValue('name', transaction.name)
    method.setValue('amount', String(transaction.amount))
    method.setValue('category', transaction.category)
    method.setValue('type', transaction.type)
  }, [method, transaction])

  return (
    <DialogCustom
      title="Editar transação"
      description="Edite os dados da transação."
      open={open}
      close={close}
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
          valueMoney={String(transaction.amount)}
          onChangeValueMoney={(value) => {
            method.setValue('amount', value)
          }}
          error={!!method.formState.errors.amount?.message}
          message={method.formState.errors.amount?.message}
        />
        <SelectedCategory
          defaultValue={transaction.type}
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
  )
}
