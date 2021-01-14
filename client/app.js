import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {Navbar, AllProducts, SingleProduct, AdminHome} from './components'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/admin" component={AdminHome} />
        </main>
      </div>
    </Router>
  )
}

export default App
