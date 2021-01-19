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

router.put('/order/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    console.log(req.body)

    if (order) {
      await order.update(req.body)
      const newOrder = await Order.create()
      newOrder.setUser(order.userId)
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
      const pricePerOne = await Product.findOne({where: {id: productId}})
      if (item) {
        const updatedQty = item.qty + 1
        const updatedPrice = updatedQty * pricePerOne.price
        await item.update({qty: updatedQty, subtotal: updatedPrice})
      } else {
        await cart.addProduct(productId)
        const newItemInCart = await ItemOrder.findOne({
          where: {productId: productId, orderId: cart.id}
        })
        await newItemInCart.update({qty: 1, subtotal: pricePerOne})
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
      const product = await Product.findOne({where: {id: productId}})
      item.qty = Number(req.body.updateQty)
      item.subtotal = item.qty * product.price
      console.log('here!!!!')
      await item.save()
      res.json(item)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('REQ BODY in ROUTE ', req.body)
    const guestOrder = await Order.create(req.body.order)
    const itemObj = req.body.item
    Object.keys(itemObj).map(async item => {
      const product = await Product.findByPk(item)
      console.log(product)
      await ItemOrder.create({
        productId: item,
        orderId: guestOrder.id,
        qty: itemObj[item],
        item_subtotal: product.price * itemObj[item]
      })
    })
    res.json(guestOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
