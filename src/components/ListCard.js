import { useMutations, usePendingCursorOperation } from '@dittolive/react-ditto'
import { useEffect, useState } from 'react'
import ListItem from './ListItem'

const ListCard = ({ collectionId, title }) => {
  const [text, setText] = useState('')
  const [completed, setCompleted] = useState(0)
  const [listLoading, setListLoading] = useState(true)

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
    if (tasks) {
      setListLoading(false)
    }
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
    setText("")
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
          {!listLoading && tasks.map((task) => (
            <ListItem
              key={task.id.value}
              toggleIsCompleted={toggleIsCompleted}
              id={task.id.value}
              isCompleted={task.value.isCompleted}
              body={task.value.body}
              removeTask={removeTask}
            />
          ))}
          {listLoading && (
            <>
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
            </>
          )}
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
            <button disabled={listLoading} onClick={softDeleteList} className="text-sm md:text-xs text-red-800 border-0 bg-transparent p-1" type="button">
              Archive list 🥡
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListCard