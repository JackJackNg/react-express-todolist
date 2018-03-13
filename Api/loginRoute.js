const router = require('express').Router()
const { authentication } = require('../Authentication')


router.post('/login',authentication,(req, res, next) => {
 res.sendStatus(200) 
})

router.get('/isLogin',(req, res,next) => {
  if (req.user) {
    res.sendStatus(200)
    return
  }
  console.log('user',req.user)
  res.sendStatus(401)
  return
})

module.exports = router