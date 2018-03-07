const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  password: String
})

userSchema.methods.validPassword = function (pwd) {
  return (this.password === pwd)
}

const User = mongoose.model('users', userSchema);

module.exports = User