type FormTypes = {
  children: React.ReactNode
} & React.FormHTMLAttributes<HTMLFormElement>

export function Form({ ...props }: FormTypes) {
  return (
    <form role="form" className="flex flex-col gap-4 pb-4 px-2" {...props}>
      {props.children}
    </form>
  )
}
