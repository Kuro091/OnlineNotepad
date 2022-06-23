import { useEffect, useState } from 'react';
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {


  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  )
}

export default MyApp
