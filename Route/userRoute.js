const router = require('express').Router()
const User = require('../Model/User')
const { UserService } = require('../Service')

router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAll()
    res.json(users)
  } catch (error) {
    res.send(400)
  }
})

router.post('/register',async (req, res) => {
  try {
    const isSucess = await UserService.create(req.body)
    if (isSucess) {
      res.sendStatus(201)
      return
    } else {
      res.sendStatus(400)
      return
    }
  } catch (error) {
    res.sendStatus(400)
    return 
  }
})

module.exports = router