import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Link} from 'react-router-dom'
import UpdateUserProfile from './UpdateUserProfile'
import {fetchSingleUser, fetchDeleteUser} from '../store/singleUser'

class MyAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      profile: {},
      editUser: false,
      addProfile: false,
      editProfile: false,
      showUpdate: false
    }
    this.setShowUpdate = this.setShowUpdate.bind(this)
  }

  handleEdit() {
    this.setState({...this.state, editProfile: true})
  }
  setShowUpdate() {
    this.setState({
      showUpdate: true
    })
  }
  render() {
    return (
      <div>
        <div className="summaryContainer">
          <div>
            <h3>MY ACCOUNT</h3>
            <hr />
            <p>Name: {this.props.user.fullName}</p>
            <p>Email: {this.props.user.email} </p>
            {/* <button type="button" onClick={this.setShowUpdate}>
              Edit
            </button> */}
            {this.state.showUpdate ? <UpdateUserProfile /> : null}
          </div>
        </div>

        {this.props.isAdmin ? (
          <div>
            <Link to="/admin">Admin Dashboard</Link>
          </div>
        ) : null}

        <a href="#" onClick={this.props.handleLogOut}>
          Logout
        </a>

        {this.state.addProfile ? (
          <div className="cartContainer">
            <div className="itemContainer">
              <h3>SHIPPING INFOMATION</h3>
              <hr />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogOut: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(MyAccount)
