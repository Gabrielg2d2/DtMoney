type ContainerProps = {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return <div className="bg-slate-200 h-screen">{children}</div>
}
