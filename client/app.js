import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {Navbar, AllProducts, SingleProduct} from './components'
import {Signup} from './components/auth-form'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/users" component={Signup} />
          <Route exact path="/products/:productId" component={SingleProduct} />
        </main>
      </div>
    </Router>
  )
}

export default App
