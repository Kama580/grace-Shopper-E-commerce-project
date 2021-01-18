import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdateUser} from '../store/singleUser'
export class UpdateUserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      bAddress: '',
      bCity: '',
      bState: '',
      bZipCode: '',
      sAddress: '',
      sCity: '',
      sState: '',
      sZipCode: '',
      country: '',
      phone: '',
      size: '',
      wddingDate: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.setState({
      firstName: this.props.Updateuser.firstName,
      lastName: this.props.Updateuser.lastName,
      bAddress: this.props.Updateuser.bAddress,
      bCity: this.props.Updateuser.bCity,
      bState: this.props.Updateuser.bState,
      bZipCode: this.props.Updateuser.bZipCode,
      sAddress: this.props.Updateuser.sAddress,
      sCity: this.props.Updateuser.sCity,
      sState: this.props.Updateuser.sState,
      sZipCode: this.props.Updateuser.sZipCode,
      country: this.props.Updateuser.country,
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
    console.log([event.target.name])
    console.log('this is input : ', event.target.value)
  }
  handleUpdate() {
    console.log('this is from update state', this.state)
    const id = this.props.Updateuser.id
    this.props.loadupdateUser(id, this.state)
    // this.props.history.push(`/users/${id}`)
  }

  render() {
    console.log('THIS ISprops from render update', this.props)
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
        <label htmlFor="bAddress" value={this.state.bAddress}>
          Billing Address
        </label>
        <input type="text" name="bAddress" onChange={this.handleChange} />
        <label htmlFor="bCity" value={this.state.bCity}>
          Billing City
        </label>
        <input type="text" name="bCity" onChange={this.handleChange} />
        <label htmlFor="bState" value={this.state.bState}>
          Billing State
        </label>
        <input type="text" name="bState" onChange={this.handleChange} />
        <label htmlFor="bZipCode" value={this.state.bZipCode}>
          Billing ZipCode
        </label>
        <input type="text" name="bZipCode" onChange={this.handleChange} />
        <label htmlFor="sAddress" value={this.state.sAddress}>
          Shipping Address
        </label>
        <input type="text" name="sAddress" onChange={this.handleChange} />
        <label htmlFor="sCity" value={this.state.sCity}>
          Shipping City
        </label>
        <input type="text" name="sCity" onChange={this.handleChange} />
        <label htmlFor="sState" value={this.state.sState}>
          Shipping State
        </label>
        <input type="text" name="sState" onChange={this.handleChange} />
        <label htmlFor="sZipCode" value={this.state.sZipCode}>
          Shipping ZipCode
        </label>
        <input type="text" name="sZipCode" onChange={this.handleChange} />
        <label htmlFor="country" value={this.state.country}>
          Country
        </label>
        <input type="text" name="country" onChange={this.handleChange} />
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
