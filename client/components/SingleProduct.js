/* eslint-disable no-useless-constructor */
import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart, addLocalStorage} from '../store/cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.addCartHandler = this.addCartHandler.bind(this)
  }

  async componentDidMount() {
    try {
      console.log('PROPS:', this.props)
      await this.props.loadSingleProduct(this.props.match.params.productId)
    } catch (err) {
      console.log(err)
    }
  }

  async addCartHandler() {
    try {
      console.log(this)
      if (this.props.user.id) {
        await this.props.addToCart(
          this.props.use.id,
          this.props.singleProduct.id
        )
      } else {
        await this.props.addLocalStorage(this.props.singleProduct.id)
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const product = this.props.singleProduct

    return (
      <div>
        <div>
          <h1>{product.name}</h1>
          <img src={product.imageUrl} />
          <p>{product.price}</p>
          <p>Color: {product.color}</p>
          <p>Size: {product.size}</p>
          <p>Quantity: 1</p>
        </div>
        <button type="button" onClick={this.addCartHandler}>
          Add To Cart
        </button>
        <div>
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('State:', state)
  return {
    singleProduct: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addItem: (userId, productId) => dispatch(addToCart(userId, productId)),
    addLocalStorage: id => dispatch(addLocalStorage(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
