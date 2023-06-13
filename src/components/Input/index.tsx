type InputTypes = {
  error?: boolean
  message?: string
  register?: any
} & React.InputHTMLAttributes<HTMLInputElement>

export function Input({ error, message, register, ...props }: InputTypes) {
  const borderError = error ? 'border-red-500' : 'border-transparent'
  const helperText = error ? (
    <span className="text-red-500 text-sm">{message}</span>
  ) : null

  return (
    <>
      <input
        className={`bg-slate-200 p-4 w-full text-text-default rounded-md border-2 ${borderError}`}
        {...props}
        {...register}
      />
      {helperText}
    </>
  )
}
