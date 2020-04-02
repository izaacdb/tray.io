import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './pages/home'
import * as serviceWorker from './serviceWorker'
import EventEmitter from '@trayio/builder-squad-event-emitter'

ReactDOM.render(
  <React.StrictMode>
    <EventEmitter>
      <Home />
    </EventEmitter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
