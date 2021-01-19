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
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/order/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    if (order) {
      await order.update(req.body)
      const newOrder = await Order.create({userId: order.userId})
      res.json(newOrder)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const action = req.query.action
    const userId = req.params.userId
    const productId = Number(req.params.productId)
    const cart = await Order.findOne({
      where: {userId: userId, status: Pending},
      include: {model: Product}
    })
    // for add cart
    if (action === 'add') {
      const item = await ItemOrder.findOne({
        where: {productId: productId, orderId: cart.id}
      })
      if (item) {
        const updatedQty = item.qty + 1
        await item.update({qty: updatedQty})
      } else {
        await cart.addProduct(productId)
      }
      const updatedItems = await ItemOrder.findAll({where: {orderId: cart.id}})

      res.send(updatedItems)
      //for delete item from cart
    } else if (action === 'remove') {
      cart.removeProducts(productId)
      const removedItem = await Product.findByPk(productId)
      res.json(removedItem)
      //for edit cart
    } else if (action === 'updateQty') {
      //edit qty code here
      const item = await ItemOrder.findOne({
        where: {productId: productId, orderId: cart.id}
      })
      console.log(typeof item.qty)
      console.log(typeof req.body.updateQty)
      item.qty = Number(req.body.updateQty)
      await item.save()
      // const updatedItems = await ItemOrder.findAll({where: {orderId: cart.id}})
      //await cart.reload()
      //console.log(item)
      res.json(item)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const guestOrder = await Order.create(req.body)
  } catch (error) {
    next(error)
  }
})

module.exports = router
