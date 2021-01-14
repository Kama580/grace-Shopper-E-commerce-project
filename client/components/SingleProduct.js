/* eslint-disable no-useless-constructor */
import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      console.log('PROPS:', this.props)
      await this.props.loadSingleProduct(this.props.match.params.productId)
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
        {/* get link from Kamah */}
        {/* <Link to={}>
            <button type="button">Add To Cart</button>
          </Link> */}
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
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
