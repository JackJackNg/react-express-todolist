const router = require('express').Router()
const { authentication } = require('../Authentication')


router.post('/login', authentication)

router.get('/isLogin', (req, res,next) => {
  if (req.user) {
    res.sendStatus(200)
    return
  }
  res.sendStatus(401)
})

module.exports = router