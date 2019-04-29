import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers =
  (!process.env.NODE_ENV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const middlewares = [
  ...(!process.env.NODE_ENV
    ? [require('redux-immutable-state-invariant').default()]
    : []),
  thunkMiddleware
]

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

export default store
