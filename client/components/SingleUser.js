import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import {fetchSingleUser, fetchDeleteUser} from '../store/singleUser'

class SingleUser extends React.Component {
  async componentDidMount() {
    try {
      const userId = this.props.match.params.userId
      await this.props.loadSingleUser(userId)
    } catch (error) {
      console.log(error)
    }
    this.deleteProfile = this.deleteProfile.bind(this)
  }
  async deleteProfile(userId) {
    this.props.removeUser(userId)
    await axios.delete(`/api/users/${userId}`)
    this.props.history.push('/products/')
  }
  render() {
    console.log('this is props', this.props.singleUser)
    const user = this.props.singleUser
    return (
      <div>
        <div>
          <h2>Customer Profile</h2>
          <h3> First Name: {user.firstName}</h3>
          <h3> Last Name: {user.lastName}</h3>
          <h4>Dress Size: {user.size}</h4>
          <h4>Phone Number: {user.phone}</h4>
          {/* //fix weedding date not showing */}
          <h4>Wedding Date: {user.weddingDate}</h4>
          <h4>Billing Address: {user.billingAddress}</h4>
          <h4>shippingAddress: {user.shippingAddress}</h4>
        </div>
        <div>
          <button type="button" onClick={() => this.deleteProfile(user.id)}>
            Delete Profile
          </button>
          {/* <Link to={`/users/${user.id}`}>Click Here to Update Profile</Link> */}
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    singleUser: state.singleUser
  }
}
const mapDispatch = dispatch => {
  return {
    loadSingleUser: id => dispatch(fetchSingleUser(id)),
    removeUser: userId => {
      dispatch(fetchDeleteUser(userId))
    }
  }
}
export default connect(mapState, mapDispatch)(SingleUser)
