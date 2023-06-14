import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react'
import { useEffect, useState } from 'react'

type CategoryTypes = {
  defaultValue: string
  outInput: (value: string) => void
}

export function SelectedCategory(props: CategoryTypes) {
  const [type, setType] = useState('deposit')

  function handleDeposit() {
    setType('deposit')
    props.outInput('deposit')
  }

  function handleWithdraw() {
    setType('withdrawn')
    props.outInput('withdrawn')
  }

  useEffect(() => {
    setType(props.defaultValue ?? 'deposit')
  }, [props.defaultValue])

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDeposit}
        type="button"
        className={`
        flex items-center justify-center gap-2 transition-all
        p-4 bg-white rounded-md border hover:bg-slate-100 w-full text-text-default  ${
          type === 'deposit' ? 'border-green-500' : 'border-gray-200'
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
        ${type === 'withdrawn' ? 'border-red-500' : 'border-gray-200'}
        `}
      >
        <ArrowCircleDown size={26} className="text-red-default" />
        Saída
      </button>
    </div>
  )
}
