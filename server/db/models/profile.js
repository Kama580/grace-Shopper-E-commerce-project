const Sequelize = require('sequelize')
const db = require('../db')

const Profile = db.define('profile', {
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
  bAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bCity: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bState: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bZipCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingAddress: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        this.getDataValue('bAddress') +
        ' , ' +
        this.getDataValue('bCity') +
        ', ' +
        this.getDataValue('bState') +
        ', ' +
        this.getDataValue('country') +
        ', ' +
        this.getDataValue('bZipCode')
      )
    }
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
  shippingAddress: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        this.getDataValue('sAddress') +
        ' , ' +
        this.getDataValue('sCity') +
        ', ' +
        this.getDataValue('sState') +
        ', ' +
        this.getDataValue('country') +
        ', ' +
        this.getDataValue('sZipCode')
      )
    }
  },
  phone: {
    type: Sequelize.STRING(13),
    unique: true,
    allowNull: false
  },
  size: {
    type: Sequelize.STRING
  },
  weddingDate: {
    type: Sequelize.DATE
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
Profile.beforeSave(profile => {
  if (!profile.shippingAddress) {
    profile.shippingAddress = profile.billingAddress
  }
})

//validation for phone num
