import { Provider as ReduxProvider } from 'react-redux'
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
