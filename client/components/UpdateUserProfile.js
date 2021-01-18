import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdateUser} from '../store/singleUser'
export class UpdateUserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      billingAddress: '',
      shippingAddress: '',
      phone: '',
      size: '',
      wddingDate: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    console.log('this is componotes props', this.props)
    this.setState({
      firstName: this.props.Updateuser.firstName,
      lastName: this.props.Updateuser.lastName,
      billingAddress: this.props.Updateuser.billingAddress,
      shippingAddress: this.props.Updateuser.shippingAddress,
      phone: this.props.Updateuser.phone,
      size: this.props.Updateuser.size,
      wddingDate: this.props.Updateuser.wddingDate
    })
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleUpdate() {
    const id = this.props.Updateuser.id
    this.props.loadupdateUser(id, this.state)
    // this.props.history.push(`/users/${id}`)
  }

  render() {
    return (
      <form onSubmit={this.handleUpdate}>
        <label htmlFor="firstName" value={this.state.firstName}>
          First Name
        </label>
        <input type="text" name="firstName" onChange={this.handleChange} />
        <label htmlFor="lastName" value={this.state.lastName}>
          Last Name
        </label>
        <input type="text" name="lastName" onChange={this.handleChange} />
        <label htmlFor="billingAddress" value={this.state.billingAddress}>
          Billing Address
        </label>
        <input type="text" name="billingAddress" onChange={this.handleChange} />
        <label htmlFor="shippingAddress" value={this.state.shippingAddress}>
          Shipping Address
        </label>
        <input
          type="text"
          name="shippingAddress"
          onChange={this.handleChange}
        />
        <label htmlFor="phone" value={this.state.phone}>
          Phone Number
        </label>
        <input type="text" name="phone" onChange={this.handleChange} />
        <label htmlFor="size" value={this.state.size}>
          Dress Size
        </label>
        <input type="text" name="size" onChange={this.handleChange} />
        <label htmlFor="weddingDate" value={this.state.weddingDate}>
          Wedding Date
        </label>
        <input type="text" name="weddingDate" onChange={this.handleChange} />
        <button type="submit">Update Profile</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    Updateuser: state.singleUser
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadupdateUser: (id, info) => dispatch(fetchUpdateUser(id, info))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserProfile)
