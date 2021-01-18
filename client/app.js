import React from 'react'
import {AnimatePresence} from 'framer-motion'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {
  Navbar,
  AllProducts,
  SingleProduct,
  AdminHome,
  LandingPage,
  Checkout,
  Cart
} from './components'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <AnimatePresence>
          <main>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/products" component={AllProducts} />
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
            <Route exact path="/admin" component={AdminHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/cart/checkout" component={Checkout} />
          </main>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
