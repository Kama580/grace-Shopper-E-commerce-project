const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total_price: {
    type: Sequelize.FLOAT
  },
  total_qty: {
    type: Sequelize.INTEGER
  },
  shipping_address: {
    type: Sequelize.STRING
  },
  order_address: {
    type: Sequelize.STRING
  },
  order_email: {
    type: Sequelize.STRING
  },
  order_date: {
    type: Sequelize.DATE
  },
  order_status: {
    type: Sequelize.ENUM(
      'Shipped',
      'Delivered',
      'Comfirmed',
      'Canceled',
      'Pending'
    )
  }
})

module.exports = Order
