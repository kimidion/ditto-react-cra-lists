import { useMutations, usePendingCursorOperation } from '@dittolive/react-ditto'
import { useEffect, useState } from 'react'

const ListCard = ({ collectionId, title }) => {
  const [text, setText] = useState('')
  const [completed, setCompleted] = useState(0)

  const { documents: tasks } = usePendingCursorOperation({
    collection: `list-${collectionId}`,
    query: "isDeleted == false"
  })
  const { upsert, updateByID } = useMutations({
    collection: `list-${collectionId}`
  })
  const { updateByID: updateList } = useMutations({
    collection: "listNames",
  })

  useEffect(() => {
    let complete = 0;
    tasks.forEach((task) => {
      if (task.value.isCompleted) {
        complete += 1
      }
    })
    setCompleted(complete)
  }, [tasks])

  const updateText = (e) =>
    setText(e.currentTarget.value)

  const addTask = (e) => {
    e.preventDefault()
    upsert({ value: { body: text, isCompleted: false, isDeleted: false } })
    setText('')
  }

  const toggleIsCompleted =
    (taskId) => (e) =>
      updateByID({
        _id: taskId,
        updateClosure: (mutableDoc) => {
          if (mutableDoc) {
            mutableDoc.at("isCompleted").set(!mutableDoc.value.isCompleted)
          }
        },
      })

  const removeTask =
    (taskId) => (e) =>
      updateByID({
        _id: taskId,
        updateClosure: (mutableDoc) => {
          if (mutableDoc) {
            mutableDoc.at("isDeleted").set(true)
          }
        },
      })

  const saveDisplayName = (e) => {
    const value = e.currentTarget.innerHTML
    updateList({
      _id: collectionId,
      updateClosure: (mutableDoc) => {
        if (mutableDoc) {
          mutableDoc.at("title").set(value)
        }
      },
    })
  }

  const softDeleteList = () => 
    updateList({
      _id: collectionId,
      updateClosure: (mutableDoc) => {
        if (mutableDoc) {
          mutableDoc.at("isDeleted").set(true)
        }
      },
    })

  return (
    <>
      <div className="border-slate-300 border p-4 rounded-2xl shadow-lg bg-white hover:scale-105 transition-all">
        <h2
          className="text-lg mb-2 p-1"
          contentEditable
          onBlur={saveDisplayName}
          dangerouslySetInnerHTML={{__html: title}}
        />
        <form className="relative" onSubmit={addTask}>
          <input
            className="block w-full rounded-lg border py-2 pl-5 pr-12 text-lg text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            aria-label="Enter an item to add"
            placeholder="... do something great"
            value={text}
            onChange={updateText}
            required
          />
          <button className="absolute top-1/2 -translate-y-1/2 right-3 rounded-full" type="submit" aria-label="add item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>
        <>
          {tasks.map((task) => (
            <div className="py-4 border-b flex" key={task.id.value}>
              <label>
                <input
                  className="align-middle border-slate-300 border-1 checked:bg-green-600 focus:checked:bg-green-600 focus:outline-blue-600 checked:hover:bg-green-600 rounded-sm"
                  type="checkbox"
                  checked={task.value.isCompleted}
                  onChange={toggleIsCompleted(task.id.value)}
                />
                <div className={`inline align-top px-2 ${task.value.isCompleted ? 'line-through opacity-40' : ''}`}>
                  <span>{task.value.body}</span>
                </div>
              </label>
              <button className="ml-auto flex-shrink-0 align-middle rounded-full relative w-[30px] h-[30px] border border-white hover:shadow-lg hover:border-slate-400" type="button" onClick={removeTask(task.id.value)} aria-label="remove item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-[24px] h-[24px] stroke-red-800 m-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          ))}
        </>
        <div className="flex flex-row items-start justify-between py-2">
          <div>
            {tasks.length !== 0 &&
              <button disabled className="text-sm md:text-xs text-slate-400 border-0 bg-transparent p-1">
                {completed} of {tasks.length} complete
              </button>
            }
          </div>
          <div>
            <button onClick={softDeleteList} className="text-sm md:text-xs text-red-800 border-0 bg-transparent p-1" type="button">
              Archive list 🥡
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListCard