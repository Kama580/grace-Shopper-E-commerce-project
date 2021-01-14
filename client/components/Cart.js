import React from 'react'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'
import {fetchOrder} from '../store/cart'
import {fetchProducts} from '../store/allProducts'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isUser: false, items: [], totalPrice: 0}
  }

  async componentDidMount() {
    try {
      await this.props.getOrder()
      this.setState({cart: cart})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        {this.state.cart[0] ? (
          <div>
            {this.state.itemsInCart.map(item => {
              return <div key={item.id} />
            })}
          </div>
        ) : (
          <div>Your cart is empty. Start shopping now!</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: () => dispatch(fetchOrder()),
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Cart)
