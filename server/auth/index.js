const router = require('express').Router()
const User = require('../db/models/user')
const Profile = require('../db/models/profile')
const {userValidationRules, validate} = require('../api/validator.js')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      include: {
        model: Profile
      },
      where: {email: req.body.email}
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post(
  '/signup',
  userValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      const user = await User.create(req.body)
      req.login(user, err => (err ? next(err) : res.json(user)))
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    }
  }
)

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.get('/:userId', async (req, res, next) => {
  try {
    const fullUserData = await User.findOne({
      include: {
        model: Profile
      },
      where: {id: req.params.userId}
    })
    res.json(fullUserData)
  } catch (error) {
    next(error)
  }
})

router.use('/google', require('./google'))
