import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './GoogleLogin.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='119904184627-1ssstt91tkt1lj9lda9e5hb4oi9kiqdo.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </GoogleOAuthProvider>
)
