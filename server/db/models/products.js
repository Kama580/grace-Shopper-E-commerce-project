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
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 10000000000
    }
  },
  fit: {
    type: Sequelize.ENUM('Mermeid', 'Ballgown', 'A-line', 'Sheath', 'Other'),
    allowNull: false,
    defaultValue: 'Other'
  },
  material: {
    type: Sequelize.ENUM('Silk', 'Crepe', 'Polyster', 'Other'),
    allowNull: false,
    defaultValue: 'Other'
  },
  color: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: ['White', 'Ivory', 'Green', 'Pink', 'Yellow']
  },
  size: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18']
  },
  image: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [
      'https://s7d1.scene7.com/is/image/BHLDN/56617194_012_b2?$zoom$'
    ]
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
