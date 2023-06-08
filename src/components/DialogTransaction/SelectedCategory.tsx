import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import { useState } from 'react'

type CategoryTypes = {
  outInput: (value: string) => void
}

export function SelectedCategory(props: CategoryTypes) {
  const [category, setCategory] = useState('deposit')

  function handleDeposit() {
    setCategory('deposit')
    props.outInput('deposit')
  }

  function handleWithdraw() {
    setCategory('withdraw')
    props.outInput('withdraw')
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDeposit}
        type="button"
        className={`
        flex items-center justify-center gap-2 transition-all
        p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default  ${
          category === 'deposit' ? 'border-green-500' : 'border-gray-200'
        }`}
      >
        <ArrowCircleUp size={26} className="text-green-default" />
        Entrada
      </button>
      <button
        onClick={handleWithdraw}
        type="button"
        className={`
        flex items-center justify-center gap-2 transition-all
        p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default 
        ${category === 'withdraw' ? 'border-red-500' : 'border-gray-200'}
        `}
      >
        <ArrowCircleDown size={26} className="text-red-default" />
        Saída
      </button>
    </div>
  )
}
