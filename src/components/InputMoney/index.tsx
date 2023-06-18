import { formatMoneyPtBr } from '@/util'
import { useEffect, useState } from 'react'

type InputTypes = {
  error?: boolean
  message?: string
  valueMoney?: string
  onChangeValueMoney: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export function InputMoney({
  error,
  message,
  valueMoney,
  onChangeValueMoney,
  ...props
}: InputTypes) {
  const [value, setValue] = useState('R$ 0,00')

  const borderError = error ? 'border-red-500' : 'border-transparent'
  const helperText = error ? (
    <span className="text-red-500 text-sm">{message}</span>
  ) : null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const valueMoney = value.replace(/\D/g, '')
    const valueMoneyPtBr = formatMoneyPtBr(parseInt(valueMoney))
    setValue(valueMoneyPtBr)
    onChangeValueMoney(valueMoney)
  }

  useEffect(() => {
    if (valueMoney) {
      const valueMoneyPtBr = formatMoneyPtBr(parseInt(valueMoney))
      setValue(valueMoneyPtBr)
    }
  }, [valueMoney])

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
