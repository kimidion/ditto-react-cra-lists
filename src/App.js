import { usePendingCursorOperation } from '@dittolive/react-ditto'
import { useEffect } from 'react'
import ListCard from './components/ListCard'
import NewListCard from './components/NewListCard'

const App = () => {
  const { ditto, documents: lists } = usePendingCursorOperation({
    collection: "listNames"
  })

  useEffect(() => {
    if (!ditto) {
      return
    }
    ditto.startSync()
    return () => ditto.stopSync()
  }, [ditto])

   return (
    <main className="min-h-full m-auto bg-white py-7 px-6">
        <h1 className="text-3xl p-5">Dynamic Real-time Lists via Ditto</h1>
        <NewListCard />
        <div className="pt-4 pl-4 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {lists.map((list) => (
            <ListCard key={list.id} collection={list.value.title} />
          )).reverse()}
        </div>
    </main>
  )
}

export default App