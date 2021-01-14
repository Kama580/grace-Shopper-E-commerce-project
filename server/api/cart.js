const router = require('express').Router()
const {User, Product, Order, ItemOrder} = require('../db/models')

//assume user has always 1 pending order
router.get('/:user', async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {id: req.params.user, status: 'Shipped'}
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
