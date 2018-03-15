import React, { Component } from 'react';
import { convertUtcToLocal } from '../util/time'
import axios from 'axios'
import 'bulma/css/bulma.css';

class ToDoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.update = this.update.bind(this)
    this.updateItemDone = this.updateItemDone.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  render() {
    const taskList = this.state.data.map((task, index) => {
      const { title, deadline, priority, description,isdone} = task
      return (<tr key={task._id} >
        <td style={{'textDecoration': (task.isdone?'line-through':'none') }}>{title}</td>
        <td>{convertUtcToLocal(deadline).format('DD MMM hh:mm')} </td>
        <td>{convertPriority(priority)} </td>
        <td>{description} </td>
        <td>{isdone?('is Done')
                   :( <button onClick={this.updateItemDone.bind(this,task)}>Mark as Done</button>)}
            <button onClick={this.removeItem.bind(this,task)}> X </button>
        </td>
      </tr>)
    })

    return (
      <div>
        <table className="table"> 

          <thead>
            <tr>
              <td>Title</td>
              <td>DeadLine</td>
              <td>Priority</td>
              <td>Description</td>
              <td>IsDone</td>
            </tr>
          </thead>

          <tbody>
            {taskList} 
          </tbody>

        </table> 
      </div>
    )
  }

  async update() {
    const { data } = await axios.get('http://localhost:3000/task')
    this.setState({
      data: sort(data)
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

  async removeItem (item) {
    const { _id } = item
    const { status } = await axios.delete(`http://localhost:3000/task/remove/${_id}`, item) 
    if (status === 200)
    {
      this.update() 
    }
  }
}


function convertPriority (value) {
  switch(value){
    case 0 :{
      console.log(value)
      return 'Normal'
    }
    case 1 : 
    {
      console.log(value)
      return 'High'
    }
    case 2:
    case 3:  
    {
      console.log(value)
      return 'Urgent'
    }
    default :
    {
      return ''
    }
  }
}

  function sort(array) {
    const newArray = array.slice(0)
    return newArray.sort(comparator)
  }

  function comparator(a,b){
    
    if(a.priority>b.priority) return -1 

    if(a.priority<b.priority) return 1
 
    return 0
}

export default ToDoList 