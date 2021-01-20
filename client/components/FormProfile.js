import React from 'react'
import Button from '@material-ui/core/Button'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

const FormProfile = props => (
  <form onSubmit={props.handleSubmit}>
    <label htmlFor="firstName" value={props.firstName}>
      First Name
    </label>
    <input type="text" name="firstName" onChange={props.handleChange} />
    <label htmlFor="lastName" value={props.lastName}>
      Last Name
    </label>
    <input type="text" name="lastName" onChange={props.handleChange} />
    <label htmlFor="bAddress" value={props.bAddress}>
      Billing Address
    </label>
    <input type="text" name="bAddress" onChange={props.handleChange} />
    <label htmlFor="bCity" value={props.bCity}>
      Billing City
    </label>
    <input type="text" name="bCity" onChange={props.handleChange} />
    <label htmlFor="bState" value={props.bState}>
      Billing State
    </label>
    <input type="text" name="bState" onChange={props.handleChange} />
    <label htmlFor="bZipCode" value={props.bZipCode}>
      Billing ZipCode
    </label>
    <input type="text" name="bZipCode" onChange={props.handleChange} />
    <label htmlFor="sAddress" value={props.sAddress}>
      Shipping Address
    </label>
    <input type="text" name="sAddress" onChange={props.handleChange} />
    <label htmlFor="sCity" value={props.sCity}>
      Shipping City
    </label>
    <input type="text" name="sCity" onChange={props.handleChange} />
    <label htmlFor="sState" value={props.sState}>
      Shipping State
    </label>
    <input type="text" name="sState" onChange={props.handleChange} />
    <label htmlFor="sZipCode" value={props.sZipCode}>
      Shipping ZipCode
    </label>
    <input type="text" name="sZipCode" onChange={props.handleChange} />
    <label htmlFor="country" value={props.country}>
      Country
    </label>
    <input type="text" name="country" onChange={props.handleChange} />
    <label htmlFor="phone" value={props.phone}>
      Phone Number
    </label>
    <input type="text" name="phone" onChange={props.handleChange} />
    <label htmlFor="size" value={props.size}>
      Dress Size
    </label>
    <input type="text" name="size" onChange={props.handleChange} />
    <label htmlFor="weddingDate" value={props.weddingDate}>
      Wedding Date
    </label>
    <input type="text" name="weddingDate" onChange={props.handleChange} />
    <button type="submit">Submit</button>
  </form>
)
export default FormProfile
