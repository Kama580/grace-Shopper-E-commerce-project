import React from 'react'
import {connect} from 'react-redux'
import {
  fetchOrder,
  fetchLocalStorageData,
  checkoutUser,
  checkoutGuest
} from '../store/cart'
import {Confirmed} from '../../server/db/models/constant'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: {
        email: '',
        firstName: '',
        lastName: '',
        sAddress: '',
        sCity: '',
        sState: '',
        sZipCode: '',
        country: '',
        phone: '',
        status: Confirmed
      },
      submit: false,
      item: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log(event.target)
    this.setState({
      order: {...this.state.order, [event.target.name]: event.target.value}
    })
    console.log(this.state)
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log('submit')
    try {
      if (this.props.user.id) {
        console.log(this.state.order)
        await this.props.checkoutUser(this.props.order.id, this.state.order)
        this.setState({submit: true})
      } else {
        console.log('guest')
        await this.props.checkoutGuest(this.state)
        this.setState({submit: true})
        console.log(this.state)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    try {
      if (this.props.user.id) {
        const user = this.props.user
        const profile = user.profile
        await this.props.getOrder(this.props.user.id)
        this.setState({
          order: {...profile, email: user.email, status: Confirmed},
          item: this.props.order.products
        })
        console.log(this.state)
      } else {
        await this.props.getLocalStorage()
        this.setState({item: this.props.order})
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        {this.state.submit ? (
          <div>Thank you for shopping with us!</div>
        ) : (
          <div className="cartContainer">
            <div className="itemContainer">
              <h3>SHIPPING INFOMATION</h3>
              <hr />
              <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="email">EMAIL</label>
                  <input
                    type="text"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.order.email}
                  />
                  <div className="halfField">
                    <label htmlFor="firstName">FIRST NAME</label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={this.handleChange}
                      value={this.state.order.firstName}
                    />
                  </div>
                  <div className="halfField">
                    <label htmlFor="lastName">LAST NAME</label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={this.handleChange}
                      value={this.state.order.lastName}
                    />
                  </div>
                  <label htmlFor="sAddress">STREET ADDRESS</label>
                  <input
                    type="text"
                    name="sAddress"
                    onChange={this.handleChange}
                    value={this.state.order.sAddress}
                  />
                  <label htmlFor="sCity">CITY</label>
                  <input
                    type="text"
                    name="sCity"
                    onChange={this.handleChange}
                    value={this.state.order.sCity}
                  />
                  <label htmlFor="sState">STATE</label>
                  <input
                    type="text"
                    name="sState"
                    onChange={this.handleChange}
                    value={this.state.order.sState}
                  />
                  <label htmlFor="sZipCode">ZIP CODE</label>
                  <input
                    type="text"
                    name="sZipCode"
                    onChange={this.handleChange}
                    value={this.state.order.sZipCode}
                  />
                  <label htmlFor="country">COUNTRY</label>
                  <input
                    type="text"
                    name="country"
                    onChange={this.handleChange}
                    value={this.state.order.country}
                  />
                  <label htmlFor="phone">PHONE NUMBER</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={this.handleChange}
                    value={this.state.order.phone}
                  />
                  <button type="submit">Submit Order</button>
                </form>
              </div>
            </div>
            <div className="summaryContainer">
              <div>
                <h3>ORDER SUMMARY</h3>
                <hr />
                <div className="summaryInfo">
                  <p>{`Total Price: $${this.props.order.totalPrice / 100}`}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: userId => dispatch(fetchOrder(userId)),
    getLocalStorage: () => dispatch(fetchLocalStorageData()),
    checkoutUser: (orderId, orderData) =>
      dispatch(checkoutUser(orderId, orderData)),
    checkoutGuest: orderData => dispatch(checkoutGuest(orderData))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
