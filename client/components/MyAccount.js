import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const MyAccount = props => {
  console.log('PROPS:', props)
  const {email, fullName, isAdmin} = props.user

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <h2>My Account</h2>
      <p>Name: {fullName}</p>
      <p>Email: {email} </p>

      {isAdmin ? (
        <div>
          <Link to="/admin">Admin Dashboard</Link>
        </div>
      ) : null}

      <a href="#" onClick={props.handleLogOut}>
        Logout
      </a>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogOut() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(MyAccount)

/**
 * PROP TYPES
 */
MyAccount.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  email: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

// const handleDashboard = () => {
//   setAnchorEl(null)
//   handleMobileMenuClose()
//   browserHistory.push('/admin')
// }
