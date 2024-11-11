// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './Components/Store/Store.jsx'
import { Provider } from 'react-redux'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

<BrowserRouter>
  <App />
</BrowserRouter>

  </Provider>

)
