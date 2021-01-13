const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./orders')

const ItemOrder = db.define('itemOrder', {
  item_subtotal: {
    type: Sequelize.INTEGER,
    validete: {
      min: 0
    }
  },
  Qty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
})

module.exports = ItemOrder
