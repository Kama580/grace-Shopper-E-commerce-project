import axios from 'axios'

const SET_SINGLE_USER = 'SET_SINGLE_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

const setSingleUser = profile => {
  return {
    type: SET_SINGLE_USER,
    profile
  }
}

export const updateUser = (profile, info) => {
  return {
    type: UPDATE_USER,
    profile,
    info
  }
}

export const removeUser = profileId => {
  return {
    type: DELETE_USER,
    profileId
  }
}

export const fetchSingleUser = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/profiles/${id}`)
      console.log('this is data', data)
      dispatch(setSingleUser(data))
    } catch (error) {
      console.log(error)
      error(error)
    }
  }
}

export const fetchUpdateUser = (id, info) => {
  console.log('this is profileId form store', id)
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/profiles/${id}`, info)
      dispatch(updateUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchDeleteUser = profileId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/profiles/${profileId}`)
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
      return action.profile
    case UPDATE_USER: {
      return action.profile
    }
    case DELETE_USER:
      return action.profile
    default:
      return state
  }
}
