const userRoute = require('./userRoute')
const taskRoute = require('./taskRoute')
const loginRoute = require('./loginRoute')
const authentication = require('./authenticationRoute')

function SetupRoute (app) {

  app.use('/', loginRoute)
  app.use('/user', userRoute)

  //After this will be restritive API
  app.use(authentication)
  app.use('/task', taskRoute)  

}

module.exports = SetupRoute