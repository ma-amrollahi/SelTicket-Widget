import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

window.mountSelTicketWidget = () => {
  ReactDOM.createRoot(document.getElementById('selticket') as HTMLElement).render(
    <App />
      ,
  )
}
