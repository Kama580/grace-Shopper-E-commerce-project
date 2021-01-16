const router = require('express').Router()
const {User, Product, Order, ItemOrder} = require('../db/models')
const {Pending} = require('../db/models/constant.js')

//assume user has always 1 pending order
router.get('/:user', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {userId: req.params.user, status: Pending},
      include: {model: Product}
    })
    console.log(cart)
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:user/:product', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {userId: req.params.user, status: Pending},
      include: {model: Product}
    })
    cart.removeProducts(req.params.product)
    const removedItem = await Product.findByPk(req.params.product)
    console.log(removedItem)
    res.json(removedItem)
  } catch (error) {
    next(error)
  }
})

// router.put('/:user', async (req, res, next) => {
//   try {
//     const cart = await Order.findOne({
//       where: {userId: req.params.user, status: Pending},
//       include: {model: Product},
//     })
//     const items = cart.products
//     const itemToUpdate = items.filter((item) => {
//       return item.id === 2
//     })
//     res.send(cart)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
