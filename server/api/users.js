const router = require('express').Router()
const {User, Order, Profile} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You are not logged in')
    err.status = 401
    return next(err)
  } else if (!req.user.isAdmin) {
    const err = new Error('You sneaky, you. Nothing to see here. ;)')
    err.status = 401
    return next(err)
  }
  next()
}

const loggedInUserAndAdminsOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You are not logged in')
    err.status = 401
    return next(err)
  } else if (req.user.id !== Number(req.params.userId) && !req.user.isAdmin) {
    console.log('Here', req.user.id, req.params.userId)
    const err = new Error('No <3')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{model: Profile}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', loggedInUserAndAdminsOnly, async (req, res, next) => {
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

router.delete('/:userId', loggedInUserAndAdminsOnly, async (req, res, next) => {
  try {
    const id = req.params.userId
    const user = await User.findByPk(id)
    await user.destroy()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', loggedInUserAndAdminsOnly, async (req, res, next) => {
  try {
    const id = req.params.userId
    const userUpdate = await User.findByPk(id)
    await userUpdate.update(req.body)
    res.status(201).send(userUpdate)
  } catch (error) {
    next(error)
  }
})
