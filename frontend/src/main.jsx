import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './functions/Auth.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from './functions/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <CartProvider>
  <Router>
    <App />
  </Router>
  </CartProvider>
</AuthProvider>
)
