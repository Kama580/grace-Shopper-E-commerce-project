import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder, fetchLocalStorageData, removeItemThunk} from '../store/cart'
import {fetchProducts} from '../store/allProducts'
import user from '../store/user'

// const guestSample = {1: 2, 6: 7, 5: 1}

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {items: [], totalPrice: 0, totalItems: 0}
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getProducts()
      //if logged-in user:

      if (this.props.user.id) {
        await this.props.getOrder(6)
        console.log(this.props.order)
        this.setState({
          items: this.props.order.products,
          totalPrice: this.props.order.total_price,
          totalItems: this.props.order.total_qty
        })
      } else {
        // if guest
        await this.props.getLocalStorage()
        const itemsIds = Object.keys(this.props.order)
        const items = this.props.products.filter(item => {
          return itemsIds.includes(String(item.id))
        })
        items.forEach(item => {
          item.qty = this.props.order[item.id]
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

  async handleDeleteItem(userId, productId) {
    await this.props.removeAnItemThunk(userId, productId)
    this.setState({...this.state, items: this.props.order.products})
    console.log(this.state)
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
                  <p>{`Price: $${item.price / 100}`}</p>
                  <p>{`Quantity: ${item.qty || item.itemOrder.qty || 1}`}</p>
                  <p>{`Subtotal: $${item.subtotal / 100 ||
                    item.itemOrder.item_subtotal / 100}`}</p>
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
                  <button
                    onClick={() => {
                      this.handleDeleteItem(6, item.id)
                    }}
                  >
                    Remove from cart
                  </button>
                </div>
              )
            })}
            <div>
              Order Summary
              <p>{`Total Price: $${this.state.totalPrice / 100}`}</p>
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
    getProducts: () => dispatch(fetchProducts()),
    getLocalStorage: () => dispatch(fetchLocalStorageData()),
    removeAnItemThunk: (userId, productId) =>
      dispatch(removeItemThunk(userId, productId))
    //call guest thunk
  }
}

export default connect(mapState, mapDispatch)(Cart)
