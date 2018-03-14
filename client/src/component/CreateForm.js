import React from 'react';
import BaseForm from './base/BaseForm'
import axios from 'axios'
import { convertLocalToUtc } from '../util/time'

class CreateForm extends BaseForm {
  constructor(props){
    super(props)
    this.getFormData = this.getFormData.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  render() {
    return (
      <form action="/api/task" method="POST" onSubmit={this.handleCreate}>
        <label htmlFor="title">Title</label>
        <input type="text" name='title' defaultValue="Do something" ref={ref => this.inputTitle = ref}  />
        <br />

        <label htmlFor="deadline">DeadLine</label>
        <input type="datetime-local" name='deadline' ref={ref => this.inputDeadline = ref} />
        <br />

        <label htmlFor="priority">Priority</label>
        <select name="priority" defaultValue="0" ref={ref => this.inputPriority = ref}>
          <option value="0">Normal</option>
          <option value="2">High</option>
          <option value="3">Urgent</option>
        </select>
        <br />

        <label htmlFor="description">description</label>
        <textarea name="description" cols="30" rows="2" defaultValue="Some Text" ref={ref => this.inputDescription = ref}></textarea>

        <input type="submit" value="submit" />
      </form>
    )
  }

  async handleCreate(e) {
    e.preventDefault()
    e.persist()
    const data = this.getFormData() 
    const {status} = await axios.post('http://localhost:3000/task/create',data)
    console.log(status)

    if(status === 201){
      this.onSubmit(e,true) 
    }

  }

  getFormData() {
   return { 
      title: this.inputTitle.value,
      deadline: convertLocalToUtc(this.inputDeadline.value),
      priority: this.inputPriority.value,
      description: this.inputDescription.value
   } 
  }
}


export default CreateForm