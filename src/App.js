import { usePendingCursorOperation } from '@dittolive/react-ditto'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import ListCard from './components/ListCard'
import NewListCard from './components/NewListCard'
import ListCardSkeleton from './components/ListCardSkeleton'

const App = ({ dittoLoading, dittoError }) => {
  const [listsLoading, setListsLoading] = useState(true)
  const { ditto, documents: lists } = usePendingCursorOperation({
    collection: "listNames",
    query: "isDeleted == false"
  })

  useEffect(() => {
    if (lists) {
      // delaying this slightly bc the skeleton flash is almost too quick with a standard load speed
      setTimeout(() => {
        setListsLoading(false)
      }, 600)
    }
  }, [lists])

  useEffect(() => {
    if (!ditto) {
      return
    }
    ditto.startSync()
    return () => ditto.stopSync()
  }, [ditto])

   return (
    <>
    <main className="min-h-full m-auto p-2 md:p-4">
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dynamic Realtime Lists with Ditto</h1>
      <p className="text-base font-semibold leading-7 text-indigo-600 mb-2">by Kim Welch</p>
      <div className="flex mb-4 gap-5">
        <a
          className="rounded-lg text-slate-900 font-semibold transition flex items-center gap-3 text-[0.8125rem] leading-6 py-1 px-1.5 hover:bg-slate-900/[0.03] -my-1 -mx-1.5" 
          href="https://github.com/kimidion/ditto-react-cra-lists"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-slate-900">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>
          </svg>
          👀 the code
        </a>
        <a
          className="rounded-lg text-slate-900 font-semibold transition flex items-center gap-3 text-[0.8125rem] leading-6 py-1 px-1.5 hover:bg-slate-900/[0.03] -my-1 -mx-1.5" 
          href="mailto:ikimidion@gmail.com"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
          </svg>
          ikimidion@gmail.com
        </a>
      </div>
      <NewListCard disabled={dittoError} />
      <div className="py-6 grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-start">
        {/* show loading skeleton on load */}
        {(dittoLoading || listsLoading) && (
          <>
            <ListCardSkeleton />
            <ListCardSkeleton />
            <ListCardSkeleton />
          </>
        )}
        {/* show the list cards if not loading and no error */}
        {!dittoError && !dittoLoading && !listsLoading && lists.map((list) => (
          <ListCard key={list.id.value} collectionId={list.id.value} title={list.value.title} />
        )).reverse()}
        
      </div>
      {/* show a static error state on a ditto load error */}
      {dittoError && (
        <div className="my-6 text-red-900 font-extrabold">There was an error loading Ditto. Error: {dittoError.toString()}</div>
      )}
    </main>
    <Analytics />
    </>
  )
}

export default App
