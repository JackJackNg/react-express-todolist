const router = require('express').Router()

//deny all request if not login 
router.all((req, res, next) => {
  if (req.user) {
    next()    
    return
  }
  res.send(401)
})

module.exports = router