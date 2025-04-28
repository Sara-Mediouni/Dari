import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './functions/Auth.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from './functions/CartContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <CartProvider>
   <ToastContainer/>
  <Router>
    <App />
  </Router>
  </CartProvider>
</AuthProvider>
)
