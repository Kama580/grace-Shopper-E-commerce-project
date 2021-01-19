/* eslint-disable complexity */
import React from 'react'
import axios from 'axios'

export class CreateUserProfile extends React.Component {
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
      // firstNameError: '',
      // lastNameError: '',
      // bAddresseError: '',
      // bCityError: '',
      // bStateError: '',
      // bZipCodeError: '',
      // sAddressError: '',
      // sCityError: '',
      // sStateError: '',
      // sZipCodeError: '',
      // countryError: '',
      // phoneError: '',
      // sizeError: '',
      // wddingDateError: '',
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
  // validate() {
  //   let firstNameError = ''
  //   let lastNameError = ''
  //   let bAddresseError = ''
  //   let bCityError = ''
  //   let bStateError = ''
  //   let bZipCodeError = ''
  //   let sAddressError = ''
  //   let sCityError = ''
  //   let sStateError = ''
  //   let sZipCodeError = ''
  //   let countryError = ''
  //   let phoneError = ''
  //   let sizeError = ''
  //   let wddingDateError = ''
  //   if (!this.state.firstName || !this.state.firstName.isNaN())
  //     firstNameError = 'First Name cant not include a  number or be blank'
  //   if (!this.state.lastName || !this.state.lastName.isNaN())
  //     lastNameError = 'Last  Name cannot be blank or include a number'
  //   if (!this.state.bAddress)
  //     bAddresseError = 'billing Addresse cannot be blank'
  //   if (!this.state.bCity || !this.state.bCity.isNaN())
  //     bCityError = 'billing CityAddresse cannot be blank or include a number'
  //   if (!this.state.bCity || !this.state.bCity.isNaN())
  //     bStateError = 'billing State Addresse cannot be blank or include a number'
  //   if (!this.state.bZipCode || this.state.bCity.isNaN())
  //     bStateError = 'billing State Addresse cannot be blank or include a number'
  // }
  async handleSubmit(event) {
    event.preventDefault()
    console.log('this is state', this.state)
    const res = await axios.post(`/api/profiles`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bAddress: this.state.bAddress,
      bCity: this.state.bCity,
      bState: this.state.bState,
      bZipCode: this.state.bZipCode,
      sAddress: this.state.sAddress,
      sCity: this.state.sCity,
      sState: this.state.sState,
      sZipCode: this.state.sZipCode,
      country: this.state.country,
      phone: this.state.phone,
      size: this.state.size,
      wddingDate: this.state.wddingDate
    })
    const id = res.data.id
    this.props.history.push(`/profiles/${id}`)
  }
  myForm() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <button type="submit">Create Profile</button>
      </form>
    )
  }
  render() {
    return <div>{this.myForm()} </div>
  }
}
