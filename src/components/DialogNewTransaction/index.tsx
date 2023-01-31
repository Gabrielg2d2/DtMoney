import { useState } from 'react'
import { DialogCustom } from '../Dialog'

export function DialogNewTransaction() {
  const [type, setType] = useState('withdraw')

  return (
    <DialogCustom
      title="Cadastrar transação"
      description="Insira os dados para nova transação"
      buttonOpen={
        <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring py-3 px-8 rounded-md text-white font-bold">
          Nova transação
        </button>
      }
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
            className={`p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default ${
              type === 'deposit' ? 'border-green-500' : ''
            }`}
            onClick={() => {
              setType('deposit')
            }}
          >
            Entrada
          </button>
          <button
            type="submit"
            className={`p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default ${
              type === 'withdraw' ? 'border-red-500' : ''
            }`}
            onClick={() => {
              setType('withdraw')
            }}
          >
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
          className="p-4 bg-green-500 hover:bg-green-600 transition-all text-white rounded-md mt-2"
        >
          Cadastrar
        </button>
      </form>
    </DialogCustom>
  )
}
