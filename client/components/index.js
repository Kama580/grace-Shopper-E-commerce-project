/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
// previously user-home
export {default as Navbar} from './navbar'

// user routes
export {default as MyAccount} from './MyAccount'
export {Login, Signup} from './auth-form'
export {default as Cart} from './Cart'
export {default as Checkout} from './Checkout'

// admin routes
export {default as AdminHome} from './AdminHome'
export {default as ManageProducts} from './ManageProducts'
export {default as ManageUsers} from './ManageUsers'

// product routes
export {default as LandingPage} from './LandingPage'
export {default as AllProducts} from './AllProducts'
export {default as SingleProduct} from './SingleProduct'
