/* eslint-disable complexity */
import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
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
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.myForm = this.myForm.bind(this)
  }
  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isAlpha', value => {
      console.log('THIS IS  VALUE', value)
      if (isNaN(value)) {
        return true
      }
      return false
    })
    ValidatorForm.addValidationRule('isZipcode', value => {
      if (!isNaN(value) && value.length === 5) {
        return true
      }
      return false
    })
    ValidatorForm.addValidationRule('isNumerical', value => {
      if (value.length >= 10) {
        return true
      }
      return false
    })
    ValidatorForm.addValidationRule('isSize', value => {
      if (!isNaN(value) && value % 2 === 0 && value <= 18 && value >= 0) {
        return true
      }
      return false
    })
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isAlpha')
    ValidatorForm.removeValidationRule('isZipcode')
    ValidatorForm.removeValidationRule('isNumerical')
    ValidatorForm.removeValidationRule('isSize')
  }
  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

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
      <ValidatorForm
        // ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        {/* <form onSubmit={this.handleSubmit}> */}
        <TextValidator
          label="First Name"
          onChange={this.handleChange}
          name="firstName"
          value={this.state.firstName}
          validators={['isAlpha', 'required']}
          errorMessages={['this field is required and must be only alphabets']}
        />
        <TextValidator
          label="Last Name"
          onChange={this.handleChange}
          name="lastName"
          value={this.state.lastName}
          validators={['isAlpha', 'required']}
          errorMessages={['this field is required and must be only alphabets']}
        />
        <TextValidator
          label="Billing Address"
          onChange={this.handleChange}
          name="bAddress"
          value={this.state.bAddress}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label="Billing Address  City"
          onChange={this.handleChange}
          name="bCity"
          value={this.state.bCity}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label="Billing Address State"
          onChange={this.handleChange}
          name="bState"
          value={this.state.bState}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label="Billing Address ZipCode"
          onChange={this.handleChange}
          name="bZipCode"
          value={this.state.bZipCode}
          validators={['isZipcode', 'required']}
          errorMessages={['this field is required and must be a zipcode']}
        />
        <TextValidator
          label="Shipping Address"
          onChange={this.handleChange}
          name="sAddress"
          value={this.state.sAddress}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label="Shipping Address City"
          onChange={this.handleChange}
          name="sCity"
          value={this.state.sCity}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label="Shipping Address State"
          onChange={this.handleChange}
          name="sState"
          value={this.state.sState}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label="Shipping   Address ZipCode"
          onChange={this.handleChange}
          name="sZipCode"
          value={this.state.sZipCode}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label="Country"
          onChange={this.handleChange}
          name="country"
          value={this.state.country}
          validators={['isAlpha', 'required']}
          errorMessages={['this field is required and must be only alphabets']}
        />
        <TextValidator
          label="Phone Number"
          onChange={this.handleChange}
          name="phone"
          value={this.state.phone}
          validators={['isNumerical', 'required']}
          errorMessages={['this field is required and formatted 000-00-0000']}
        />
        <TextValidator
          label="Dress Size"
          onChange={this.handleChange}
          name="size"
          value={this.state.size}
          validators={['required']}
          errorMessages={[
            'this field is required and an even number between 0 and 18'
          ]}
        />
        <TextValidator
          label="Wedding Date"
          onChange={this.handleChange}
          name="weddingDate"
          value={this.state.weddingDate}
          validators={['required']}
          errorMessages={[
            'this field is required and an even number between 0 and 18'
          ]}
        />

        <Button type="submit">Submit</Button>
        {/*
         */}
        {/* </form> */}
      </ValidatorForm>
    )
  }
  render() {
    return <div>{this.myForm()} </div>
  }
}
