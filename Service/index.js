const mongoose = require('mongoose')
const UserService = require('./UserService')
const TaskService = require('./TaskService')

// Database
mongoose.connect('mongodb://localhost:27017/test')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () { console.log('we are connected') })

module.exports.TaskService = TaskService
module.exports.UserService = UserService