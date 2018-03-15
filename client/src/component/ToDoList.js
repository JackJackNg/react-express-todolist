import React, { Component } from 'react';
import { convertUtcToLocal } from '../util/time'
import axios from 'axios'


class ToDoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.update = this.update.bind(this)
    this.updateItemDone = this.updateItemDone.bind(this)
  }

  render() {
    const taskList = this.state.data.map((task, index) => {
      const { title, deadline, priority, description,isdone} = task
      return (<li key={task._id} style={{'text-decoration': (task.isdone?'line-through':'none') }}>
        <span>{title}</span>
        <span>{convertUtcToLocal(deadline).format('DD MMM')} </span>
        <span>{priority}</span>
        <span>{description} </span>
        <span>{isdone} </span>
        {isdone?(<span>is Done</span>):(<button onClick={this.updateItemDone.bind(this,task)}>Mark as Done</button>)}
      </li>)
    })

    return (
      <div>
        <button onClick={this.update}> Update </button>
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

  async updateItemDone (item) {
    const { _id, ...task } = item
    task.isdone = true
    const { status } = await axios.put(`http://localhost:3000/task/update/${_id}`, task) 
    if (status === 200)
    {
      this.update() 
    }

  }

}

export default ToDoList 