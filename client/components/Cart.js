import React from 'react'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'
import {fetchItems} from '../store/allProducts'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      await this.props.getProducts()
    } catch (error) {
      console.log(error)
    }
  }

  render() {}
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: () => dispatch(fetchItems())
  }
}

export default connect(mapState, mapDispatch)(Cart)
