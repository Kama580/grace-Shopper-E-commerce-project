import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}
// const defaultUser = {
//   id: 6,
//   email: 'sichii@gmail.com',
//   firstName: 'Satomi',
//   lastName: 'Ichii',
//   streetAddress: '100 Woodruff Ave. apt5A',
//   city: 'Brooklyn',
//   state: 'New York',
//   zip: 11226,
//   country: 'United States',
//   phone: '646-318-4835'
// }

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  console.log('this is method', method)
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    // history.push('/users')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
  method === 'login' ? history.push('/products') : history.push('/profiles')
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserWithProfile = userId => {
  return async dispatch => {
    try {
      console.log('this is hit')
      const {data} = await axios.get(`/auth/${userId}`)
      console.log('This is the user data', data)
      dispatch(getUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
