import ListItem from "./ListItem"

const ListCardSkeleton = () => {
  return (
    <div className="animate-pulse border-slate-300 border p-4 rounded-2xl shadow-lg bg-white">
        <h2 className="text-lg mb-2 p-1 block w-full bg-gray-200 rounded-md">&nbsp;</h2>
        <form className="relative">
          <input
            className="block w-full rounded-lg border py-2 pl-5 pr-12 text-lg text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled
          />
          <button disabled className="absolute top-1/2 -translate-y-1/2 right-3 rounded-full" type="submit" aria-label="add item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>
        <ListItem
            skeleton
            toggleIsCompleted={() => {}}
            removeTask={() => {}}
        />
        <ListItem
            skeleton
            toggleIsCompleted={() => {}}
            removeTask={() => {}}
        />
        <div className="flex flex-row items-start justify-between py-2">
          <div />
          <div>
            <button disabled className="text-sm md:text-xs text-red-800 border-0 bg-transparent p-1" type="button">
              Archive list 🥡
            </button>
          </div>
        </div>
    </div>
  )
}

export default ListCardSkeleton