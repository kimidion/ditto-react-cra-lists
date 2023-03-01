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
    <main className="min-h-full m-auto bg-white p-2 md:p-4">
        <h1 className="text-3xl mb-5 md:mt-6 md:mb-6">Dynamic Real-time Lists via Ditto</h1>
        <NewListCard />
        <div className="py-6 grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {lists.map((list) => (
            <ListCard key={list.id.value} collectionId={list.id.value} collection={list.value.title} displayName={list.value.displayName} />
          )).reverse()}
        </div>
    </main>
  )
}

export default App