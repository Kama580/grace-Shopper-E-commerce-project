import axios from 'axios'

const SET_ITEMS = 'SET_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const ADD_GUEST_ITEM = 'ADD_GUEST_ITEM'

export const setItems = items => {
  return {
    type: SET_ITEMS,
    items
  }
}

// For later
export const removeItems = removedItem => {
  return {type: REMOVE_ITEM, removedItem}
}

export const addItem = addedItem => {
  return {type: ADD_ITEM, addedItem}
}

export const addGuestItem = data => {
  return {type: ADD_GUEST_ITEM, data}
}

export const fetchOrder = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart/' + id)
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
      const {data} = await axios.put(`/api/cart/${userId}/${productId}`)
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

export default function itemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ADD_ITEM:
      return {...state, products: [...state.products, action.addedItem]}
    case ADD_GUEST_ITEM:
      return action.data
    default:
      return state
  }
}
