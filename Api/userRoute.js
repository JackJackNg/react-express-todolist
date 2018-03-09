const router = require('express').Router()
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
const { authentication } = require('../Authentication')
const User = require('../Model/User')


router.post('/register', (req, res) => {

  const { username, password } = req.body
  const user = new User({ username: username, password: password });

  user.save((err, user) => {
    if (err)
    {
      res.sendStatus(400)
      return
    } 
    res.sendStatus(200)
    return
  })

})

module.exports = router