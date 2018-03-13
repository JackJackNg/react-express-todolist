const router = require('express').Router()
const Task = require('../Model/Task')

router.get('/', ({ user
}, res) => {
  if (!user) {
    res.sendStatus(401)
    return
  }

  Task.find({owner  : user._id}).exec()
    .then((doc, err) => {
      if (err) {
        res.json({ err: err })
      } else {
        res.json(doc)
      }
    })

})

router.post('/create', ({ user, ...req }, res) => {
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
    owner: user._id
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

router.put('/update/:id', async (req,res) => {

  if (!req.user) {
    res.sendStatus(401)
    return
  }

  const query = { _id: req.params.id  }
  const { _id,owner, ...update} = req.body
  
  const previousTask = await Task.findOneAndUpdate(query,update).exec()
  res.status(200).json(previousTask)
  return 

})


module.exports = router