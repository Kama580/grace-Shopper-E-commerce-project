import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_SINGLE_PRODUCT = `UPDATE_SINGLE_PRODUCT`

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const removeProduct = removedProduct => {
  return {
    type: REMOVE_PRODUCT,
    removedProduct
  }
}

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const updateSingleProduct = product => {
  return {
    type: UPDATE_SINGLE_PRODUCT,
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

export const deleteProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/products/${id}`)
      dispatch(removeProduct(data))
    } catch (error) {
      console.log('Error in deleteProduct thunk', error)
    }
  }
}

export const postProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(addProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateProduct = (productId, productUpdates) => {
  return async dispatch => {
    try {
      await axios.put(`/api/products/${productId}`, productUpdates)
      const {data} = await axios.get('/api/products')
      console.log('UPDATED DAT:', data)
      dispatch(setProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case REMOVE_PRODUCT:
      return [...state].filter(
        product => product.id !== action.removedProduct.id
      )
    case ADD_PRODUCT:
      return [action.product, ...state]
    // case UPDATE_SINGLE_PRODUCT:
    //   return [...state].map( product => { product.id === action.product.id ? action.product : product })
    default:
      return state
  }
}
