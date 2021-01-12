import React from 'react'
import {connect} from 'react-redux'

import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      await this.props.loadSingleProject(this.props.match.params.id)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const product = this.props.singleProduct

    return (
      <div>
        <h1>Hello </h1>
        <div>
          <h1>{product.name}</h1>
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

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
