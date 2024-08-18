import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/Context/Storecontext.jsx'
import { ThemeProvider } from '@emotion/react'
import theme from './components/Them/Theme.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
    <ThemeProvider theme={theme}>
  <App />
  </ThemeProvider>
  </StoreContextProvider>
    </BrowserRouter>
  
)
