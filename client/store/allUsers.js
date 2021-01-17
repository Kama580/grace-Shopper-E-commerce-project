import axios from 'axios'

const SET_USERS = 'SET_USERS'

export const setUsers = users => {
  return {
    type: SET_USERS,
    users
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (error) {
      console.log('Error in fetchUsers thunk', error)
    }
  }
}

export default function allUsersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
