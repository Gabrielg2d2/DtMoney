import { DialogCustom } from '../Dialog'
import { Input } from '../Input'
import { Form } from './Form'
import { SelectedCategory } from './SelectedCategory'
import { Submit } from './Submit'
import { useForm } from 'react-hook-form'
import {
  TransactionDataTypes,
  TransactionType
} from '@/entity/Transaction/TransactionEntity'
import { useEffect } from 'react'

type DialogEditTransactionTypes = {
  handleSubmit: (data: any) => void
  transaction: TransactionDataTypes
  open: boolean
  close: () => void
}

export type FormTypes = {
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
  const method = useForm<FormTypes>({
    defaultValues: {
      name: transaction.name,
      amount: String(transaction.amount),
      category: transaction.category,
      type: transaction.type
    }
  })

  function onSubmit(data: FormTypes) {
    const obj: TransactionDataTypes = {
      id: transaction.id,
      name: data.name,
      amount: Number(data.amount),
      category: data.category,
      type: data.type as TransactionType,
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
      title="Edit Transaction"
      description="Fill in the fields to edit the transaction"
      open={open}
      close={close}
    >
      <Form onSubmit={method.handleSubmit(onSubmit)}>
        <Input placeholder="Nome" register={method.register('name')} />
        <Input placeholder="Preço" register={method.register('amount')} />
        <SelectedCategory
          outInput={(value) => {
            method.setValue('type', value)
          }}
        />
        <Input placeholder="Categoria" register={method.register('category')} />
        <Submit />
      </Form>
    </DialogCustom>
  )
}
