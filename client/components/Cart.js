import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder} from '../store/cart'
import {fetchProducts} from '../store/allProducts'

const guestSample = {1: 2, 6: 7, 5: 1}

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {items: [], totalPrice: 0, totalItems: 0}
  }

  async componentDidMount() {
    try {
      await this.props.getProducts()
      //if logged-in user:

      if (this.props.user.id) {
        await this.props.getOrder(this.props.user.id)
        let items = this.props.order.products.map(item => {
          return item
        })
        this.setState({
          items: items,
          totalPrice: this.props.order.total_price / 100,
          totalItems: this.props.order.total_qty
        })
      } else {
        //if guest
        const itemsIds = Object.keys(guestSample)
        const items = this.props.products.filter(item => {
          return itemsIds.includes(String(item.id))
        })
        items.forEach(item => {
          item.qty = guestSample[item.id]
          item.subtotal = item.qty * item.price
        })
        //   const totalPrice = items.reduce((acc, curr) => {
        //     acc + curr.subtotal
        //   })}

        this.setState({items: items})
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        {this.state.items[0] ? (
          <div>
            {this.state.items.map(item => {
              return (
                <div key={item.id}>
                  <div>
                    <img src={item.imageUrl} />
                  </div>
                  <Link to={`/products/${item.id}`}>{item.name}</Link>
                  <p>{`Color: ${item.color}`}</p>
                  <p>{`Size: ${item.size}`}</p>
                  <p>{`Price: ${item.price}`}</p>
                  <p>{`Quantity: ${item.qty || item.itemOrder.qty}`}</p>
                  <p>{`Subtotal: ${item.subtotal ||
                    item.itemOrder.item_subtotal}`}</p>
                  <label htmlFor="qty">Change Amount:</label>
                  <select name="qty">
                    {[1, 2, 3, 4, 5, 6, 7].map(num => {
                      return (
                        <option key={num} value="$num">
                          {num}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )
            })}
            <div>
              Order Summary<p>{`Total Price: $${this.state.totalPrice}`}</p>
            </div>
            <button>Checkout</button>
          </div>
        ) : (
          <div>Your cart is empty!</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.order,
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: userId => dispatch(fetchOrder(userId)),
    getProducts: () => dispatch(fetchProducts())
    //call guest thunk
  }
}

export default connect(mapState, mapDispatch)(Cart)
