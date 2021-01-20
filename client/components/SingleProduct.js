/* eslint-disable no-useless-constructor */
import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart, addLocalStorage} from '../store/cart'
import {Paper} from '@material-ui/core'
import {motion} from 'framer-motion'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.addCartHandler = this.addCartHandler.bind(this)
  }

  async componentDidMount() {
    try {
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
          this.props.user.id,
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
      <div className="product-container">
        <motion.div
          className="product-image"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 1}}
        >
          <img src={product.imageUrl} />
        </motion.div>

        <div className="product-card">
          <Paper>
            <div className="product-content">
              <div className="product-title">
                <h2>{product.name}</h2>
                <p>${product.price / 100}</p>
              </div>
              <hr />
              <div className="colors">
                <p>Color: {product.color}</p>
              </div>

              <p>Size: {product.size}</p>
              <p>Quantity: 1</p>
              <p>{product.description}</p>

              <button
                className="cart-button"
                type="button"
                onClick={this.addCartHandler}
              >
                Add To Cart
              </button>
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
    addLocalStorage: id => dispatch(addLocalStorage(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
