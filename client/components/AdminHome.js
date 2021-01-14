import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/allProducts'
import {
  List,
  Paper,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Fab
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

class AdminHome extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      await this.props.getProducts()
    } catch (error) {
      console.log('This is componentDidMount error', error)
    }
  }

  deleteHandler(id) {
    this.props.deleteProduct(id)
  }

  render() {
    return (
      <div className="adminContainer">
        <div className="adminListContainer">
          <Paper>
            <List>
              {this.props.products.map(product => {
                console.log(product)
                return (
                  <ListItem key={product.id}>
                    <ListItemAvatar>
                      <Avatar src={product.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={product.name} />
                    <Fab
                      size="small"
                      onClick={() => this.deleteHandler(product.id)}
                    >
                      <DeleteIcon />
                    </Fab>
                    <Fab size="small">
                      <EditIcon />
                    </Fab>
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    deleteProduct: id => dispatch(deleteProduct(id))
  }
}

export default connect(mapState, mapDispatch)(AdminHome)
