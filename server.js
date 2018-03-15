const PORT = process.env.PORT || 3001

const express = require('express')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const route = require('./Route')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin:'http://localhost:3000' }))
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session())

route(app)

app.listen(PORT,() => { console.log('listening: ', PORT) }) 