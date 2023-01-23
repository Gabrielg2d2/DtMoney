type ContainerProps = {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return <div className="bg-slate-100 h-screen">{children}</div>
}
