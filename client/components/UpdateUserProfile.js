import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdateUser} from '../store/singleUser'
import Button from '@material-ui/core/Button'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
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
  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isAlpha')
  }
  componentDidMount() {
    console.log('THIS IS props from render update', this.props)
    ValidatorForm.addValidationRule('isAlpha', value => {
      if (isNaN(value)) {
        return true
      }
      return false
    })
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
  handleUpdate(evt) {
    console.log('this is from update state', this.state)
    evt.preventDefault()
    const id = this.props.myProfileId
    this.props.loadupdateUser(id, this.state)
    // this.props.history.push(`/users/${id}`)
  }

  render() {
    return (
      <ValidatorForm
        // ref="form"
        onSubmit={this.handleUpdate}
        onError={errors => console.log(errors)}
      >
        {/* <form onSubmit={this.handleSubmit}> */}
        <TextValidator
          label="First Name"
          onChange={this.handleChange}
          name="firstName"
          value={this.state.firstName}
          validators={['isAlpha']}
          errorMessages={['this field is required and must be only alphabets']}
        />
        <TextValidator
          label="Last Name"
          onChange={this.handleChange}
          name="lastName"
          value={this.state.lastName}
          validators={['isAlpha']}
          errorMessages={['this field is required and must be only alphabets']}
        />
        <TextValidator
          label="Billing Address"
          onChange={this.handleChange}
          name="bAddress"
          value={this.state.bAddress}
        />
        <TextValidator
          label="Billing Address  City"
          onChange={this.handleChange}
          name="bCity"
          value={this.state.bCity}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label="Billing Address State"
          onChange={this.handleChange}
          name="bState"
          value={this.state.bState}
        />
        <TextValidator
          label="Billing Address ZipCode"
          onChange={this.handleChange}
          name="bZipCode"
          value={this.state.bZipCode}
        />
        <TextValidator
          label="Shipping Address"
          onChange={this.handleChange}
          name="sAddress"
          value={this.state.sAddress}
        />
        <TextValidator
          label="Shipping Address City"
          onChange={this.handleChange}
          name="sCity"
          value={this.state.sCity}
        />
        <TextValidator
          label="Shipping Address State"
          onChange={this.handleChange}
          name="sState"
          value={this.state.sState}
        />
        <TextValidator
          label="Shipping   Address ZipCode"
          onChange={this.handleChange}
          name="sZipCode"
          value={this.state.sZipCode}
        />
        <TextValidator
          label="Country"
          onChange={this.handleChange}
          name="country"
          value={this.state.country}
          validators={['isAlpha']}
          errorMessages={['this field is required and must be only alphabets']}
        />
        <TextValidator
          label="Phone Number"
          onChange={this.handleChange}
          name="phone"
          value={this.state.phone}
        />
        <TextValidator
          label="Dress Size"
          onChange={this.handleChange}
          name="size"
          value={this.state.size}
        />
        <TextValidator
          label="Wedding Date"
          onChange={this.handleChange}
          name="weddingDate"
          value={this.state.weddingDate}
        />

        <Button type="submit">Submit</Button>
        {/*
         */}
        {/* </form> */}
      </ValidatorForm>
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
