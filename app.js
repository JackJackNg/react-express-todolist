const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const {
  userRoute,
  taskRoute
} = require('./Api')
const {authentication} = require('./Authentication')

const PORT = process.env.PORT || 3001
const app = express()
mongoose.connect('mongodb://localhost:27017/test')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/user', userRoute)
app.use('/task', authentication, taskRoute)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, function () {
  console.log('listening: ', PORT)
})