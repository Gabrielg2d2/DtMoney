import { CurrencyDollar } from 'phosphor-react'

export function Header() {
  return (
    <header className="bg-violet-800 h-48 p-8 flex items-start justify-center">
      <div className="flex items-center justify-between flex-1 max-w-screen-xl">
        <div className="flex items-center gap-2">
          <CurrencyDollar
            size={32}
            className="bg-[#33CC95] text-white rounded-full p-1"
          />
          <h1 className="text-2xl text-white font-bold">dt money</h1>
        </div>
        <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring py-3 px-8 rounded-md text-white font-bold">
          Nova transação
        </button>
      </div>
    </header>
  )
}
