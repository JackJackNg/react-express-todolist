const User = require('../Model/User')

class UserService {
  static async getAll() {
    return await User.find().exec()
  }

  static async create({ username, password }) {
    const user = new User({
      username: username,
      password: password
    }) 

    return new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    })

  }

  static UpdateOne() {
    return
  }
}

module.exports = UserService