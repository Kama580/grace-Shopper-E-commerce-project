import axios from 'axios'

const SET_ITEMS = 'SET_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'

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

export default function itemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    default:
      return state
  }
}
