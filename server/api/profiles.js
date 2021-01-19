const router = require('express').Router()
const {User, Profile} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Profile.findAll({
      attributes: ['id', 'fullName', 'firstName', 'lastName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.get('/:profileId', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
  try {
    const newProfile = await Profile.create(req.body)
    res.status(201).send(newProfile)
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
