
const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../Model/User')

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({
      username: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
))


router.get('/', (req, res) => {
  User.find().select({
    username: 1
  }).exec().then((doc, err) => {
    if (err) {
      console.log(err)
      res.json({ err: err })
    } else {
      console.log(doc)
      res.json(doc)
    }
  })

})

router.get('/login', (req, res) => {
  res.redirect('/home.html')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/user/login'
}));

router.post('/register', (req, res) => {
  const {
    username,
    password
  } = req.body

  const user = new User({
    username: username,
    password: password
  });

  user.save((err, user) => {
    if (err)
      res.redirect('/user/login')
    else
      res.send('send to to do list')
  })
})


module.exports = router