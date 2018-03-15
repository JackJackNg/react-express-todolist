const router = require('express').Router()
const Task = require('../Model/Task')
const { TaskService } = require('../Service')
const moment = require('moment')

router.get('/', ({ user }, res) => {
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

router.post('/create', async ({ user, ...req }, res) => {
  const {
    title,
    deadline,
    priority,
    description
  } = req.body

  const isSuccess = await TaskService.create({
    title: title,
    deadline: deadline,
    priority: priority,
    description: description,
    owner: user._id
  })

  if (isSuccess) {
    res.sendStatus(201)
  } else {
    res.sendStatus(400)
  }

})

router.put('/update/:id', async (req,res) => {

  const { ...update } = req.body
  update._id = req.params.id

  const isSucess = await TaskService.update(update)

  if (isSucess) {
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }

})

router.delete('/remove/:id', async (req,res) => {
  const task = { _id: req.params.id}
  const isSucess = await TaskService.remove(task)
  if (isSucess) {
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

module.exports = router