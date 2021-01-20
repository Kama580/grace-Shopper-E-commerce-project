/* eslint-disable no-lone-blocks */
import React from 'react'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
{
  /* <AnimatePresence>
          <main>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/products" component={AllProducts} />
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
            <Route exact path="/admin" component={AdminHome} />
            <Route exact path="/profiles/:profileId" component={SingleUser} />
            <Route path="/profiles" component={CreateUserProfile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/cart/checkout" component={Checkout} />
          </main>
        </AnimatePresence> */
}
