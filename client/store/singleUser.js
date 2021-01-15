import axios from 'axios'

const SET_SINGLE_USER = 'SET_SINGLE_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

const setSingleUser = user => {
  return {
    type: SET_SINGLE_USER,
    user
  }
}

export const updateUser = (user, info) => {
  console.log('this is info', info)
  return {
    type: UPDATE_USER,
    user,
    info
  }
}

export const removeUser = userId => {
  return {
    type: DELETE_USER,
    userId
  }
}

export const fetchSingleUser = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      dispatch(setSingleUser(data))
    } catch (error) {
      error(error)
    }
  }
}

export const fetchUpdateUser = (id, info) => {
  console.log('this is info', info)
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${id}`, info)
      dispatch(updateUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchDeleteUser = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(removeUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// let initialState = {}

export default function singleUserReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.user
    case UPDATE_USER: {
      return action.user
    }
    case DELETE_USER:
      return action.user
    default:
      return state
  }
}
