import { UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  register?: UseFormRegisterReturn
} & JSX.IntrinsicElements['input']

export function Input({ register, ...props }: InputProps) {
  return (
    <input
      type="text"
      className="bg-slate-200 p-4 w-full text-text-default rounded-md"
      {...props}
      {...register}
    />
  )
}
