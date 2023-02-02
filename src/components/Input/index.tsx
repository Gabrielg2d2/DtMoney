import { UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  register?: UseFormRegisterReturn
  errors?: object
} & JSX.IntrinsicElements['input']

export function Input({ register, errors, ...props }: InputProps) {
  const borderError = errors?.[props?.name]
    ? 'border-red-500'
    : 'border-transparent'

  return (
    <>
      <input
        className={`bg-slate-200 p-4 w-full text-text-default rounded-md border-2 ${borderError}`}
        {...props}
        {...register}
      />
      {errors && props.name ? (
        <span className="text-red-500 text-sm">
          {errors[props.name]?.message}
        </span>
      ) : null}
    </>
  )
}
