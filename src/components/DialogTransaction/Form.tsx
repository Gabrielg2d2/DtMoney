type FormTypes = {
  children: React.ReactNode
  handleSubmit: () => void
}

export function Form(props: FormTypes) {
  return (
    <form
      className="flex flex-col gap-4 pb-4 px-2"
      onSubmit={props.handleSubmit}
    >
      {props.children}
    </form>
  )
}
