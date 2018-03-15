const Task = require('../Model/Task')

class TaskService {
  static async getAll() {
    return await Task.find().exec()
  }

  static async create({
    title,
    deadline,
    priority,
    description,
    owner
  }) {

    const task = new Task({
      title: title,
      deadline: deadline,
      priority: priority,
      description: description,
      owner: owner
    })

    return new Promise((resolve, reject) => {
      task.save((err) => {
        if (err) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    })

  }

  static async update({
    _id,
    title,
    deadline,
    priority,
    isdone,
    description
  }) {
    const update = {
      title: title,
      deadline: deadline,
      priority: priority,
      description: description,
      isdone: isdone
    }

    return new Promise((resolve, reject) => {
      try {
        const data = Task.findByIdAndUpdate(_id, update).exec()
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }

  static async remove({ _id }) {

    return new Promise((resolve, reject) => {
      try {
        const data = Task.findByIdAndRemove(_id).exec()
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }
}
  module.exports = TaskService