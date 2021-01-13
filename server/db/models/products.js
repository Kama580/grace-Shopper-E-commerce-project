const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 10000000000
    }
  },
  fit: {
    type: Sequelize.ENUM('Mermaid', 'Ballgown', 'A-line', 'Sheath', 'Other'),
    allowNull: false,
    defaultValue: 'Mermaid'
  },
  material: {
    type: Sequelize.ENUM('Silk', 'Crepe', 'Polyester', 'Other'),
    allowNull: false,
    defaultValue: 'Silk'
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'White'
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 8
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://s7d1.scene7.com/is/image/BHLDN/56617194_012_b2?$zoom$'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 'Nice dress!'
  }
})

module.exports = Product
