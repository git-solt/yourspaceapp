import 'normalizecss/normalize.css'
import './styles/styles.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'

import App from './components/App'
import store from './redux/store/configureStore'


const appRoot = document.querySelector('#app')

console.log(`App up ${process.env.FUN_RUN}`)



ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  , appRoot)