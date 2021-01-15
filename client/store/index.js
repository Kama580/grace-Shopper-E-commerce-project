import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProductReducer from './singleProduct'
import singleUserReducer from './singleUser'
import productsReducer from './allProducts'
import itemReducer from './cart'

const reducer = combineReducers({
  user,
  products: productsReducer,
  singleProduct: singleProductReducer,
  singleUser: singleUserReducer,
  order: itemReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
