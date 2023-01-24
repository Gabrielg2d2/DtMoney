import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

type CardProps = {
  title?: string
  value: string
  icon?: React.ReactNode
}

type ContainerCardProps = {
  children: React.ReactNode
  bgColor?: string
}

function ContainerCard({ children, bgColor = 'bg-white' }: ContainerCardProps) {
  return (
    <div
      className={`${bgColor} min-w-[300px] rounded-md shadow-md p-4 h-32 flex-1 flex flex-col gap-4`}
    >
      {children}
    </div>
  )
}

export function CardIncoming({ title = 'Entradas', value }: CardProps) {
  return (
    <ContainerCard>
      <div className="flex items-center justify-between">
        <span className="text-gray-700 text-base">{title}</span>
        <ArrowCircleUp size={32} className="text-green-default" />
      </div>
      <span className="text-4xl font-bold  text-text-default">{value}</span>
    </ContainerCard>
  )
}

export function CardOutgoing({ title = 'Saídas', value }: CardProps) {
  return (
    <ContainerCard>
      <div className="flex items-center justify-between">
        <span className="text-gray-700 text-base">{title}</span>
        <ArrowCircleDown size={32} className="text-red-default" />
      </div>
      <span className="text-4xl font-bold text-text-default">{value}</span>
    </ContainerCard>
  )
}

export function CardTotal({ title = 'Total', value }: CardProps) {
  return (
    <ContainerCard bgColor={'bg-green-default'}>
      <div className="flex items-center justify-between">
        <span className="text-white text-base">{title}</span>
        <CurrencyDollar size={32} className="text-white rounded-full p-1" />
      </div>
      <span className="text-4xl font-bold text-white">{value}</span>
    </ContainerCard>
  )
}
