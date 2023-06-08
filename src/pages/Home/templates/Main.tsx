type MainTypes = {
  children: React.ReactNode
}

export function Main(props: MainTypes) {
  return (
    <main className="max-w-screen-xl px-4 mx-auto mt-[-48px]">
      {props.children}
    </main>
  )
}
