const router = require('express').Router()
const {User, Profile} = require('../db/models')
const {profileValidationRules, validate} = require('./validator.js')
module.exports = router

const loggedInUserOnly = (req, res, next) => {
  if (req.user.profileId !== Number(req.params.profileId)) {
    const err = new Error('No <3')
    err.status = 401
    return next(err)
  }
  next()
}

const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('You sneaky, you. Nothing to see here. ;)')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await Profile.findAll({
      attributes: ['id', 'fullName', 'firstName', 'lastName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:profileId', loggedInUserOnly, async (req, res, next) => {
  try {
    const id = req.params.profileId
    if (isNaN(id)) res.status(400).send()
    const myProfile = await Profile.findByPk(id, {
      include: [{model: User}]
    })
    if (!myProfile) res.status(400).send()
    res.status(200).send(myProfile)
  } catch (error) {
    next(error)
  }
})

router.post('/', profileValidationRules(), validate, async (req, res, next) => {
  try {
    const newProfile = await Profile.create(req.body)
    console.log('this is inewProfile', newProfile)
    res.status(201).json(newProfile)
  } catch (error) {
    next(error)
  }
})
router.delete('/:profileId', async (req, res, next) => {
  try {
    const id = req.params.profileId
    const profile = await Profile.findByPk(id)
    await profile.destroy()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})
router.put('/:profileId', async (req, res, next) => {
  try {
    const id = req.params.profileId
    const profileUpdate = await Profile.findByPk(id)
    await profileUpdate.update(req.body)
    res.status(201).send(profileUpdate)
  } catch (error) {
    next(error)
  }
})
