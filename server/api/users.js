const router = require('express').Router()
const {User, Order, Profile} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{model: Profile}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.get('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    if (isNaN(id)) res.status(400).send()
    const myUser = await User.findByPk(id, {
      include: [{model: Order}, {model: Profile}]
    })
    if (!myUser) res.status(400).send()
    res.status(200).send(myUser)
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
  } catch (error) {
    next(error)
  }
})
router.delete('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    const user = await User.findByPk(id)
    await user.destroy()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})
router.put('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    const userUpdate = await User.findByPk(id)
    await userUpdate.update(req.body)
    res.status(201).send(userUpdate)
  } catch (error) {
    next(error)
  }
})
