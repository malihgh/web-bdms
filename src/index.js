import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import './index.css'
import 'ol/ol.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.css'

import {appReducers} from './reducers'
// import {store, injectReducer} from '@ist-supsi/bmsjs'
// injectReducer(store, appReducers)

import {createReducer} from '@ist-supsi/bmsjs'


const store = createStore(
  createReducer(appReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware
  )
)

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
registerServiceWorker()
