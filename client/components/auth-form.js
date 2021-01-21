import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Paper} from '@material-ui/core'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, reroute, reroutePath} = props
  return (
    <div className="loginContainer">
      <Paper className="loginPaper" elevation={3}>
        <form onSubmit={handleSubmit} name={name}>
          <label htmlFor="email">
            <small>EMAIL</small>
          </label>
          <input name="email" type="text" required />
          <label htmlFor="password">
            <small>PASSWORD</small>
          </label>
          <input name="password" type="password" required />
          <button className="loginButton" type="submit">
            {displayName}
          </button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <div className="authContainer">
          <button>
            <div className="google">
              <img src="/google-icon.svg" />
            </div>
            <a className="loginLink" href="/auth/google">
              {displayName} with Google
            </a>
          </button>
        </div>
        <div className="authContainer">
          <a className="loginLink" href={reroutePath}>
            {reroute}
          </a>
        </div>
      </Paper>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    reroute: 'Create an Account',
    reroutePath: '/signup',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    reroute: 'Already have an account?',
    reroutePath: '/login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (email.includes('@') || password.length >= 5) {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
