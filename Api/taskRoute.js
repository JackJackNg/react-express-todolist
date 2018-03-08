const router = require('express').Router()
const Task = require('../Model/Task')

router.get('/', ({
  user
}, res) => {
  if (!user) {
    res.sendStatus(401)
    return
  }

  Task.find().exec()
    .then((doc, err) => {
      if (err) {
        res.json({
          err: err
        })
      } else {
        res.json(doc)
      }
    })
})

router.post('/create', ({ user }, res) => {

  if (!user) {
    res.sendStatus(401)
    return
  }

  const {
    title,
    deadline,
    priority,
    isdone = false,
    description
  } = req.body

  const task = new Task({
    title: title,
    deadline: deadline,
    priority: priority,
    isdone: isdone,
    description: description,
    owner: req.session.userid ? req.session.userid : "5a980bcd80707033c419ab47" // remove this if done
  })

  task.save((err, docs) => {
    if (err) {
      res.sendStatus(400)
      return
    }
      res.sendStatus(201)
      return
  })
})


module.exports = router