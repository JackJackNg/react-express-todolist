import React, { Component } from 'react';
import axios from 'axios'

class ToDoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : []
    }

    this.update = this.update.bind(this)
  }

  render() {
    console.log(this.state.data)
    const taskList = this.state.data.map((task) => {
      return(<li key={task._id}>title {task.title}</li>)
    })

    return (
      <div>
        <h1>todo list</h1>
        <button onClick={this.update}>Update</button>
        <ul>
          {taskList}
        </ul>
      </div>
    )
  }


  async update(){
    const {data} = await axios.get('http://localhost:3000/task')
    this.setState({
      data: data
    })
  }



}

export default ToDoList 