import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Link} from 'react-router-dom'
import UpdateUserProfile from './UpdateUserProfile'
import {fetchSingleUser, fetchDeleteUser} from '../store/singleUser'
import {fetchAllUsersOrders} from '../store/cart'
import {OrderHidtory} from './OrderHistory'

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
      <div>
        <div className="summaryContainer">
          <div>
            <h3>MY ACCOUNT</h3>
            <hr />
            <p>Name: {this.props.singleUser.fullName}</p>
            <p>Email: {this.props.user.email} </p>
            {/* <button type="button" onClick={this.setShowUpdate}>
              Edit
            </button> */}
            {this.state.showUpdate ? <UpdateUserProfile /> : null}
          </div>
        </div>

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
