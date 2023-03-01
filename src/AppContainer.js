import { Ditto } from '@dittolive/ditto'
import { DittoProvider } from '@dittolive/react-ditto'
import React from 'react'
import App from './App'

const AppContainer = () => {
    const createDittoInstance = () => {
      // Example of how to create an online playground instance
      const ditto = new Ditto({
        type: 'onlinePlayground',
        appID: process.env.REACT_APP_DITTO_APP_ID,
        token: process.env.REACT_APP_DITTO_TOKEN
      })
      return ditto
    }

  return (
    <DittoProvider setup={createDittoInstance}>
      {({ loading, error }) => {
        if (loading) {
          return <div>Loading Ditto…</div>
        }

        if (error) {
          return (
            <div>
              There was an error loading Ditto. Error: {error.toString()}
            </div>
          )
        }

        return <App />
      }}
    </DittoProvider>
  )
}

export default AppContainer