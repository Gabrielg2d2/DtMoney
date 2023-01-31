import { useDialogNewTransaction } from '@/hook/DialogNewTransaction/useDialogNewTransaction'
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import { DialogCustom } from '../Dialog'

export function DialogNewTransaction() {
  const { type, handleType, make } = useDialogNewTransaction()

  return (
    <DialogCustom
      title={make().title}
      description={make().description}
      buttonOpen={make().buttonOpen}
    >
      <form className="flex flex-col gap-4 pb-4 px-2">
        <input
          type="text"
          placeholder="Nome"
          className="bg-slate-200 p-4 w-full text-text-default rounded-md"
        />
        <input
          type="text"
          placeholder="Preço"
          className="bg-slate-200 p-4 w-full text-text-default rounded-md"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className={`
            flex items-center justify-center gap-2 transition-all
            p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default ${
              type === 'deposit' ? 'border-green-500' : ''
            }`}
            onClick={() => {
              handleType('deposit')
            }}
          >
            <ArrowCircleUp size={26} className="text-green-default" />
            Entrada
          </button>
          <button
            type="submit"
            className={`
            flex items-center justify-center gap-2 transition-all
            p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default ${
              type === 'withdrawn' ? 'border-red-500' : ''
            }`}
            onClick={() => {
              handleType('withdrawn')
            }}
          >
            <ArrowCircleDown size={26} className="text-red-default" />
            Saída
          </button>
        </div>

        <input
          type="text"
          placeholder="Categoria"
          className="bg-slate-200 p-4 w-full text-text-default rounded-md"
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
