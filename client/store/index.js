import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProductReducer from './singleProduct'
import productsReducer from './allProducts'
import itemReducer from './cart'
import allUsersReducer from './allUsers'

const reducer = combineReducers({
  user,
  products: productsReducer,
  singleProduct: singleProductReducer,
  order: itemReducer,
  users: allUsersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
