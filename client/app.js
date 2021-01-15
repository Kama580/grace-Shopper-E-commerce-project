import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {
  Navbar,
  AllProducts,
  SingleProduct,
  SingleUser,
  Signup,
  CreateUserProfile,
  UpdateUserProfile
} from './components'
// import {} from './components/auth-form'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/signup'" component={Signup} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/users/:userId" component={SingleUser} />
          <Route exact path="/users/:userId" component={UpdateUserProfile} />
          <Route exact path="/users" component={CreateUserProfile} />
        </main>
      </div>
    </Router>
  )
}

export default App
