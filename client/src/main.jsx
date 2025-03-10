import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import { Toaster } from './components/ui/toaster'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(

  <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
  </StrictMode>

)
