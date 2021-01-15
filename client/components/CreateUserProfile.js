import React from 'react'
import axios from 'axios'

export class CreateUserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      billingAddress: '',
      shippingAddress: '',
      phone: '',
      size: '',
      wddingDate: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.myForm = this.myForm.bind(this)
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit() {
    event.preventDefault()
    const res = await axios.post(`/api/users`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      billingAddress: this.state.billingAddress,
      shippingAddress: this.state.shippingAddress,
      phone: this.state.phone,
      size: this.state.size,
      email: this.state.email,
      password: this.state.password,
      wddingDate: this.state.wddingDate
    })
    const id = res.data.id
    this.props.history.push(`/users/${id}`)
  }
  myForm() {
    console.log('this is props', this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email" value={this.state.email}>
          Email
        </label>
        <input type="text" name="email" onChange={this.handleChange} />
        <label htmlFor="password" value={this.state.password}>
          Password
        </label>
        <input type="text" name="password" onChange={this.handleChange} />
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
        <button type="submit">Create Profile</button>
      </form>
    )
  }
  render() {
    return <div>{this.myForm()} </div>
  }
}
