const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  isdone: {
    type: Boolean,
    default: false,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  owner: {
    type: String,
    required: true
  }
})

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task