import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import UpdateUserProfile from './UpdateUserProfile'
import {fetchSingleUser, fetchDeleteUser} from '../store/singleUser'

class SingleUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
    this.myProfile = this.myProfile.bind(this)
    this.updateForm = this.updateForm.bind(this)
  }
  async componentDidMount() {
    try {
      const profileId = this.props.match.params.profileId
      console.log('this is profileId', profileId)
      await this.props.loadSingleUser(profileId)
    } catch (error) {
      console.log(error)
    }
    this.deleteProfile = this.deleteProfile.bind(this)
  }
  updateForm() {
    this.setState({showForm: true})
  }
  async deleteProfile(profileId) {
    this.props.removeUser(profileId)
    await axios.delete(`/api/profiles/${profileId}`)
    this.props.history.push('/products/')
  }
  myProfile() {
    const profile = this.props.singleUser
    return (
      <div>
        <div>
          <h2>Customer Profile</h2>
          <h3> First Name: {profile.firstName}</h3>
          <h3> Last Name: {profile.lastName}</h3>
          <h4>Dress Size: {profile.size}</h4>
          <h4>Phone Number: {profile.phone}</h4>
          {/* //fix weedding date not showing */}
          <h4>Wedding Date: {profile.weddingDate}</h4>
          <h4>Billing Address: {profile.billingAddress}</h4>
          <h4>Shipping Address: {profile.shippingAddress}</h4>
        </div>
        <div>
          <button type="button" onClick={() => this.deleteProfile(profile.id)}>
            Delete Profile
          </button>
          <button type="button" onClick={() => this.updateForm()}>
            Update Profile
          </button>
        </div>
      </div>
    )
  }
  render() {
    return this.state.showForm ? (
      <div>
        <UpdateUserProfile />
      </div>
    ) : (
      <div>{this.myProfile()}</div>
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
    removeUser: profileId => {
      dispatch(fetchDeleteUser(profileId))
    }
  }
}
export default connect(mapState, mapDispatch)(SingleUser)
