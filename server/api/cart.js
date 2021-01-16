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

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const productId = Number(req.params.productId)
    const order = await Order.findOne({
      where: {userId: userId, status: Pending},
      include: {model: Product}
    })
    const items = await ItemOrder.findAll({
      where: {productId: productId, orderId: order.id}
    })
    console.log(items)
    // if (items.filter((item) => item.id === productId).length) {
    //   items = items.map((item) => {
    //     return
    //     item.id === productId
    //       ? {...item.itemOrder, qty: (item.itemOrder.qty += 1)}
    //       : item
    //   })

    // const itemToUpdate = items.filter((item) => {
    //   return item.id === 2
    // })
    res.send(res)
  } catch (error) {
    next(error)
  }
})

module.exports = router
