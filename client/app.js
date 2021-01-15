import React from 'react'
// import {
//   Navbar,
//   AllProducts,
//   SingleProduct,
//   SingleUser,
//   Signup,
//   Login,
//   CreateUserProfile,
//   UpdateUserProfile,
//   AdminHome,
//   Cart,
// } from './components'
import Routes from './routes'
import {Navbar} from './components'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
