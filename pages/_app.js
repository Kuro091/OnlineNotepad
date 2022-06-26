import { useEffect, useState } from 'react';
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { persistor, store } from '../app/store'
import '../styles/globals.css'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </ReduxProvider>
  )
}

export default MyApp
