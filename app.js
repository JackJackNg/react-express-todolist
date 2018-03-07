const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const userRoute = require('./api/userRoute')
const cors  = require('cors')
const PORT = process.env.PORT || 3001
const app = express()
// database connection 
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
})); // Express cookie session middleware 
app.use(passport.initialize())
app.use(passport.session())
app.use('/user', userRoute)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, function () {
  console.log('listening: ', PORT)
})