import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/allProducts'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0
  }
}

class AllProducts extends React.Component {
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

  render() {
    return (
      <div className="allProductsContainer">
        <div className="sidebar">
          <img src="/sidebar_img.png" />
          <img src="/sort_img.png" />
        </div>
        <div className="cardContainer">
          {this.props.products.map(product => {
            return (
              <div className="card" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="imageContainer">
                    <img src={product.imageUrl} />
                  </div>
                </Link>
                <div className="inforContainer">
                  <p>{product.name}</p>
                  <p>${product.price / 100}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      // <Card className={classes.root}>
      //   <CardActionArea>
      //     <CardMedia
      //       className={classes.media}
      //       image="https://s7d1.scene7.com/is/image/BHLDN/59278606_011_b5?$pdpmain$"
      //       title="Contemplative Reptile"
      //     />
      //   </CardActionArea>
      //   <CardActions>
      //     <Button size="small" color="primary">
      //       Some dress name.
      //     </Button>
      //     <Button size="small" color="primary">
      //       Learn More
      //     </Button>
      //   </CardActions>
      // </Card>
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
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
