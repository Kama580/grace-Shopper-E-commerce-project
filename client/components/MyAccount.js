import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Link} from 'react-router-dom'
import UpdateUserProfile from './UpdateUserProfile'
import {fetchSingleUser, fetchDeleteUser} from '../store/singleUser'
import {fetchAllUsersOrders} from '../store/cart'
import {OrderHidtory} from './OrderHistory'
import {Paper} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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

    // this.handleOrderHistoryClick = this.handleOrderHistoryClick.bind(this)
  }
  async componentDidMount() {
    try {
      if (this.props.user) {
        await this.props.getProfileInfo(this.props.user.profileId)
        await this.props.getOrderHistory(this.props.user.id)
      }
    } catch (error) {
      console.log(error)
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
      <div className="loginContainer">
        <Paper className="loginPaper" elevation={3}>
          <div className="accountContainer">
            <div>
              <h3>MY ACCOUNT</h3>
              <hr />
              <div className="accountInfo">
                <div className="avatarHolder">
                  <img src="/profile-user-gray.png" className="userIcon" />
                </div>
                <div className="userInfo">
                  <p>Name: {this.props.singleUser.fullName}</p>
                  <p>Email: {this.props.user.email} </p>
                </div>
                <button href="#" onClick={this.props.handleLogOut}>
                  Logout
                </button>
                {/* <button type="button" onClick={this.setShowUpdate}>
              Edit
            </button> */}
                {this.state.showUpdate ? <UpdateUserProfile /> : null}
              </div>
            </div>
          </div>
          <div className="linkContainer">
            {this.props.isAdmin ? (
              <div>
                <Link to={{pathname: '/admin'}}>Admin Dashboard</Link>
              </div>
            ) : null}
            <div>
              <Link
                to={{
                  pathname: '/order_history',
                  orderHistory: this.props.order.orderHistory
                }}
              >
                Order History
              </Link>
            </div>
          </div>

          {this.state.addProfile ? (
            <div className="cartContainer">
              <div className="itemContainer">
                <h3>SHIPPING INFOMATION</h3>
                <hr />
              </div>
            </div>
          ) : null}
        </Paper>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    order: state.order,
    singleUser: state.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogOut: () => dispatch(logout()),
    getProfileInfo: profileId => dispatch(fetchSingleUser(profileId)),
    getOrderHistory: userId => dispatch(fetchAllUsersOrders(userId))
  }
}

export default connect(mapState, mapDispatch)(MyAccount)
