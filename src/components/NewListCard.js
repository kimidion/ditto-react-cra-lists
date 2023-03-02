import { useMutations } from '@dittolive/react-ditto'
import { useState } from 'react'


const NewListCard = () => {
  const [listTitle, setListTitle] = useState('')

  const { upsert } = useMutations({
    collection: "listNames",
  })

  const updateListTitle = (e) =>
    setListTitle(e.currentTarget.value)

  const addList = (e) => {
    e.preventDefault()
    if (listTitle === "")
      return
    upsert({ value: { title: listTitle, isDeleted: false } })
    setListTitle("")
  }

  return (
    <div className="border-slate-300 bg-white border p-4 rounded-2xl shadow-lg w-full md:max-w-[600px]">
        <form className="relative" onSubmit={addList}>
          <input
            className="block w-full rounded-lg border py-2 pl-5 pr-12 text-lg text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            aria-label="Add a new List"
            placeholder="Add a new list"
            value={listTitle}
            onChange={updateListTitle}
            required
          />
          <button className="absolute top-1/2 -translate-y-1/2 right-3 rounded-full" type="submit" aria-label="add item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>
    </div>
  )
}

export default NewListCard