import axios from 'axios'

const SET_ITEMS = 'SET_ITEMS'

export const setItems = items => {
  return {
    type: SET_ITEMS,
    items
  }
}

export const fetchItemsUser = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart/' + id)
      dispatch(setItems(data))
    } catch (error) {
      console.log('Error in fetchItems thunk', error)
    }
  }
}

export default function itemsReducer(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    default:
      return state
  }
}
