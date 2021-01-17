import React from 'react'
import {connect} from 'react-redux'
import {checkoutUser, checkoutGuest} from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingData: {address: '100 woodruff'},
      order: this.props.order
    }
  }

  render() {
    checkoutUser(2, this.state)
    return <div>Checkout Compornent</div>
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
    checkoutUser: (orderId, orderData) =>
      dispatch(checkoutUser(orderId, orderData)),
    checkoutGuest: orderData => dispatch(checkoutGuest(orderData))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
