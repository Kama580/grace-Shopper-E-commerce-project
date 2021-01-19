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

    // for add cart
    if (action === 'add') {
      const order = await Order.findOne({
        where: {userId: userId, status: Pending},
        include: {model: Product}
      })
      const item = await ItemOrder.findOne({
        where: {productId: productId, orderId: order.id}
      })
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

router.post('/', async (req, res, next) => {
  try {
    const guestOrder = await Order.create(req.body.order)
    const itemObj = req.body.item
    Object.keys(itemObj).map(async item => {
      const product = await Product.findByPk(item)
      ItemOrder.create({
        productId: item,
        orderId: guestOrder.id,
        qty: itemobj[item],
        item_subtotal: product.price * itemobj[item]
      })
    })
    res.json(guestOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
