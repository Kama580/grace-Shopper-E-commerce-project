const Sequelize = require('sequelize')
const db = require('../db')
const {Shipped, Delivered, Comfirmed, Canceled, Pending} = require('./constant')

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
  // order_address: {
  //   type: Sequelize.STRING
  // },
  // order_email: {
  //   type: Sequelize.STRING
  // },
  date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM(
      //CONSTANT
      Shipped,
      Delivered,
      Comfirmed,
      Canceled,
      Pending
    )
  }
})

module.exports = Order
