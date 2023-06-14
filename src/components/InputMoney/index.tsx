import { useState } from 'react'

type InputTypes = {
  error?: boolean
  message?: string
  onChangeValueMoney: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export function InputMoney({
  error,
  message,
  onChangeValueMoney,
  ...props
}: InputTypes) {
  const [value, setValue] = useState('R$ 0,00')

  const borderError = error ? 'border-red-500' : 'border-transparent'
  const helperText = error ? (
    <span className="text-red-500 text-sm">{message}</span>
  ) : null

  function formatValueMoneyPtBr(value: string) {
    const valueMoney = value.replace(/\D/g, '')
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(valueMoney) / 100)
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const valueMoney = value.replace(/\D/g, '')
    const valueMoneyPtBr = formatValueMoneyPtBr(valueMoney)
    setValue(valueMoneyPtBr)
    onChangeValueMoney(valueMoney)
  }

  return (
    <>
      <input
        className={`bg-slate-200 p-4 w-full text-text-default rounded-md border-2 ${borderError}`}
        value={value}
        onChange={onChange}
        {...props}
      />
      {helperText}
    </>
  )
}
