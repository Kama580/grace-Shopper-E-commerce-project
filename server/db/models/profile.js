const Sequelize = require('sequelize')
const db = require('../db')

const Profile = db.define('profile', {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingAddress: {
    //may need its own table
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  size: {
    type: Sequelize.STRING
  },
  weddingDate: {
    type: Sequelize.DATEONLY
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
      )
    }
  }
})

module.exports = Profile

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
Profile.beforeSave(user => {
  if (!user.shippingAddress) {
    user.shippingAddress = user.billingAddress
  }
})
//validation for phone num
