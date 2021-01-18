const User = require('./user')
const Product = require('./products')
const Order = require('./orders')
const ItemOrder = require('./item-orders')
const Profile = require('./profile')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, {through: ItemOrder})
Order.belongsToMany(Product, {through: ItemOrder})

User.belongsTo(Profile)
Profile.hasOne(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  ItemOrder,
  Profile
}
