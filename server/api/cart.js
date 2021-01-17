const router = require('express').Router()
const {ListItemAvatar} = require('@material-ui/core')
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

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const action = req.query.action
    const userId = req.params.userId
    const productId = Number(req.params.productId)

    // for add cart
    if (action === 'add') {
      const order = await Order.findOne({
        where: {userId: userId, status: Pending},
        include: {model: Product}
      })
      const item = await ItemOrder.findOne({
        where: {productId: productId, orderId: order.id}
      })
      console.log(item)
      if (item) {
        const updatedQty = item.qty + 1
        await item.update({qty: updatedQty})
      } else {
        await order.addProduct(productId)
      }
      const updatedItems = await ItemOrder.findAll({where: {orderId: order.id}})

      res.send(updatedItems)
      //for delete item from cart
    } else if (action === 'remove') {
      const cart = await Order.findOne({
        where: {userId: userId, status: Pending},
        include: {model: Product}
      })
      cart.removeProducts(productId)
      const removedItem = await Product.findByPk(productId)
      res.json(removedItem)
      //for edit cart
    } else {
      //edit qty code here
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
