/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './AllProducts'
export {default as SingleProduct} from './SingleProduct'
export {CreateUserProfile} from './CreateUserProfile'
export {default as UpdateUserProfile} from './UpdateUserProfile'
export {default as SingleUser} from './SingleUser'
export {default as AdminHome} from './AdminHome'
export {default as ManageProducts} from './ManageProducts'
export {default as ManageUsers} from './ManageUsers'
export {default as Cart} from './Cart'
export {default as Checkout} from './Checkout'
export {default as LandingPage} from './LandingPage'
export {default as SignInSignUp} from './SignInSignUp'
