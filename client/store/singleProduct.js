import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const UPDATE_SINGLE_PRODUCT = `UPDATE_SINGLE_PRODUCT`

const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

const updateSingleProduct = product => {
  return {
    type: UPDATE_SINGLE_PRODUCT,
    product
  }
}

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(setSingleProduct(data))
    } catch (error) {
      error(error)
    }
  }
}

export const updateProduct = (productId, productUpdates) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/products/${productId}`,
        productUpdates
      )
      dispatch(updateSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

let initialState = {}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    case UPDATE_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
