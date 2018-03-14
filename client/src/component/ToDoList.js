import React, { Component } from 'react';
import axios from 'axios'
import { convertUtcToLocal } from '../util/time'


class ToDoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }

    this.update = this.update.bind(this)
  }

  render() {
    console.log(this.state.data)

    const taskList = this.state.data.map((task, index) => {
      const { title, deadline, priority, description,isdone} = task
      return (<li key={task._id}>
        <span>{title} </span>
        <span>{convertUtcToLocal(deadline).format('DD MMM')} </span>
        <span>{priority} </span>
        <span>{description} </span>
        <span>{isdone} </span>
        {isdone?(<span>is Done</span>):(<button onClick={this.updateItemDone.bind(this,task)}>Mark as Done</button>)}
      </li>)
    })

    return (
      <div>
        <button onClick={this.update}>Update</button>
        <ul>
          {taskList}
        </ul>
      </div>
    )
  }


  async update() {
    const { data } = await axios.get('http://localhost:3000/task')
    console.log(data)
    this.setState({
      data: data
    })
  }

  async updateItemDone(item) {
    const { _id, ...task } = item
    console.log(task)
    task.isdone = true
    const { status } = await axios.put(`http://localhost:3000/task/update/${_id}`, task) // do pass the whole object in just ,is done will done
    if (status === 200)
    {
      console.log('successful')
    } 
    else
    {
      console.log(status)
    }
  }

}

export default ToDoList 