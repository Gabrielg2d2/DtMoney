export function Header() {
  return (
    <header className="bg-violet-800 h-48 p-8 flex items-start justify-center">
      <div className="flex items-center justify-between flex-1 max-w-screen-xl">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl text-white font-bold">dt money</h1>
        </div>
        <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring px-4 py-2 rounded-md text-white font-bold">
          Nova transação
        </button>
      </div>
    </header>
  )
}
