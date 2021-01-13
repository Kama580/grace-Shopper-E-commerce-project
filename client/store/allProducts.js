import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (error) {
      console.log('Error in fetchProducts thunk', error)
    }
  }
}

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
