import {NextWeek} from '@material-ui/icons'
import axios from 'axios'

const SET_ITEMS = 'SET_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const ADD_GUEST_ITEM = 'ADD_GUEST_ITEM'
const UPDATE_QTY = 'UPDATE_QTY'

export const setItems = items => {
  return {
    type: SET_ITEMS,
    items
  }
}

export const removeItems = removedItem => {
  return {type: REMOVE_ITEM, removedItem}
}

export const addItem = addedItem => {
  return {type: ADD_ITEM, addedItem}
}

export const addGuestItem = data => {
  return {type: ADD_GUEST_ITEM, data}
}

export const updateQty = updatedItem => {
  return {type: UPDATE_QTY, updatedItem}
}

export const fetchOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`)
      dispatch(setItems(data))
    } catch (error) {
      console.log('Error in fetchItems thunk', error)
    }
  }
}

export const fetchLocalStorageData = () => {
  return async dispatch => {
    try {
      const data = JSON.parse(window.localStorage.getItem('cart'))
      if (data) {
        dispatch(setItems(data))
      }
    } catch (error) {
      console.log('Error in fetchLocalStorageData thunk', error)
    }
  }
}

export const addToCart = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cart/${userId}/${productId}?action=add`
      )
      console.log('this is data', data)
      dispatch(addItem(data))
    } catch (error) {
      console.log('Error in addToCart thunk', error)
    }
  }
}

export const addLocalStorage = id => {
  return dispatch => {
    let data = JSON.parse(window.localStorage.getItem('cart'))
    if (data) {
      if (data[id]) {
        data[id]++
      } else {
        data[id] = 1
      }
      window.localStorage.clear()
      window.localStorage.setItem('cart', JSON.stringify(data))
    } else {
      data = {[id]: 1}
      window.localStorage.setItem('cart', JSON.stringify(data))
    }
    dispatch(addGuestItem(data))
  }
}

export const removeItemThunk = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cart/${userId}/${productId}?action=remove`
      )
      dispatch(removeItems(data))
    } catch (error) {
      console.log('Error in fetchItems thunk', error)
    }
  }
}

export const removeFromLocalStrage = productId => {
  return dispatch => {
    let data = JSON.parse(window.localStorage.getItem('cart'))
    delete data[productId]
    window.localStorage.clear()
    window.localStorage.setItem('cart', JSON.stringify(data))
    dispatch(addGuestItem(data))
  }
}

export const editLocalStorage = (productId, qty) => {
  return dispatch => {
    let data = JSON.parse(window.localStorage.getItem('cart'))
    data[productId] = qty
    window.localStorage.clear()
    window.localStorage.setItem('cart', JSON.stringify(data))
    dispatch(setItems(data))
  }
}

export const checkoutUser = (orderId, orderData) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/order/${orderId}`, orderData)
      dispatch(setItems(data))
    } catch (error) {
      console.log('Error in checkoutUser thunk', error)
    }
  }
}

export const checkoutGuest = orderData => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', orderData)
      window.localStorage.clear()
      dispatch({type: 'default'})
    } catch (error) {
      console.log('Error in checkoutUser thunk', error)
    }
  }
}

export const updateQtyThunk = (userId, productId, updateObj) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cart/${userId}/${productId}?action=updateQty`,
        updateObj
      )
      //console.log(data)
      dispatch(updateQty(data))
    } catch (error) {
      console.log('Error in updateQtyThunk', error)
    }
  }
}

export default function itemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ADD_ITEM:
      return {...state, products: [action.addedItem]}
    case ADD_GUEST_ITEM:
      return action.data
    case REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.id !== action.removedItem.id
        })
      }
    case UPDATE_QTY:
      const index = state.products.findIndex(
        product => product.itemOrder.productId === action.updatedItem.productId
      )
      const newStateProducts = [...state.products]
      newStateProducts[index].itemOrder = action.updatedItem
      return {...state, products: newStateProducts}
    default:
      return state
  }
}
