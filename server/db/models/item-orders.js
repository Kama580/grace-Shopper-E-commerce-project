const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./orders')
const Product = require('./products')

const ItemOrder = db.define('itemOrder', {
  item_subtotal: {
    type: Sequelize.INTEGER,
    validete: {
      min: 0
    }
  },
  qty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    },
    defaultValue: 1
  },
  subtotal: {
    type: Sequelize.VIRTUAL,
    set() {
      return Product.productId.price * this.qty
    }
  }
})

module.exports = ItemOrder
