import { useTransactionsContext } from '@/context/transactions'
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import { DialogCustom } from '../Dialog'
import { Input } from '../Input'

type DialogTransactionProps = {
  isEdit?: boolean
  open: boolean
  close: () => void
}

export function DialogTransaction({
  isEdit = false,
  open,
  close
}: DialogTransactionProps) {
  const { make, onSubmit, methods } = useTransactionsContext()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = methods

  return (
    <DialogCustom
      title={make(isEdit).title}
      description={make(isEdit).description}
      open={open}
      close={close}
    >
      <form
        className="flex flex-col gap-4 pb-4 px-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Nome"
          name="name"
          errors={errors}
          register={register('name')}
        />
        <Input
          name="amount"
          placeholder="Preço"
          errors={errors}
          register={register('amount')}
        />

        <div className="flex gap-2">
          <button
            type="button"
            className={`
            flex items-center justify-center gap-2 transition-all
            p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default ${
              watch('type') === 'deposit' ? 'border-green-500' : ''
            }`}
            onClick={() => {
              setValue('type', 'deposit')
            }}
          >
            <ArrowCircleUp size={26} className="text-green-default" />
            Entrada
          </button>
          <button
            type="button"
            className={`
            flex items-center justify-center gap-2 transition-all
            p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default ${
              watch('type') === 'withdrawn' ? 'border-red-500' : ''
            }`}
            onClick={() => {
              setValue('type', 'withdrawn')
            }}
          >
            <ArrowCircleDown size={26} className="text-red-default" />
            Saída
          </button>
        </div>

        <Input
          name="category"
          placeholder="Categoria"
          register={register('category')}
          errors={errors}
        />

        <button
          type="submit"
          className="p-4 bg-[#33CC95] hover:bg-[#20b37d] transition-all text-white rounded-md mt-2"
        >
          Cadastrar
        </button>
      </form>
    </DialogCustom>
  )
}
