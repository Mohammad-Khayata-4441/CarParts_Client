import ReactDOM from 'react-dom/client'
import '@/assets/scss/index.scss'
import App from './app/App'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <Provider store={store}>

    <App />

  </Provider>
)
