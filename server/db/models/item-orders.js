const Sequelize = require('sequelize')
const db = require('../db')
//const Order = require('./orders')

const itemOrder = db.define('itemOrder', {
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
    }
  }
})

module.exports = ItemOrder
