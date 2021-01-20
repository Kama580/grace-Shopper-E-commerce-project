const Sequelize = require('sequelize')
const db = require('../db')
const {Shipped, Delivered, Confirmed, Canceled, Pending} = require('./constant')

const Order = db.define('order', {
  total_price: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  total_qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  email: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  sAddress: {
    type: Sequelize.STRING
  },
  sCity: {
    type: Sequelize.STRING
  },
  sState: {
    type: Sequelize.STRING
  },
  sZipCode: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM(Shipped, Delivered, Confirmed, Canceled, Pending),
    defaultValue: Pending
  }
})

module.exports = Order
