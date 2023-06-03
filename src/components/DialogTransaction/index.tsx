import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import { DialogCustom } from '../Dialog'
import { Input } from '../Input'
import { useState } from 'react'

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
        <form className="flex flex-col gap-4 pb-4 px-2" onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" />
          <Input name="amount" placeholder="Preço" />

          <div className="flex gap-2">
            <button
              type="button"
              className={`
            flex items-center justify-center gap-2 transition-all
            p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default border-green-500`}
            >
              <ArrowCircleUp size={26} className="text-green-default" />
              Entrada
            </button>
            <button
              type="button"
              className={`
            flex items-center justify-center gap-2 transition-all
            p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default border-red-500`}
            >
              <ArrowCircleDown size={26} className="text-red-default" />
              Saída
            </button>
          </div>

          <Input name="category" placeholder="Categoria" />

          <button
            type="submit"
            className="p-4 bg-[#33CC95] hover:bg-[#20b37d] transition-all text-white rounded-md mt-2"
          >
            Cadastrar
          </button>
        </form>
      </DialogCustom>
    </>
  )
}
