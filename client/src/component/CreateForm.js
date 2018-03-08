import React from 'react';
import BaseForm from './base/BaseForm'
import PropTypes from 'prop-types'

class CreateForm extends BaseForm {

  render() {
    return (
      <form action="/api/task" method="POST" onSubmit={this.onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name='title' value="" />
        <br />

        <label htmlFor="deadline">DeadLine</label>
        <input type="datetime-local" name='deadline' value="" />
        <br />

        <label htmlFor="priority">Priority</label>
        <select name="priority">
          <option value="0">Normal</option>
          <option value="2">High</option>
          <option value="3">Urgent</option>
        </select>
        <br />

        <label htmlFor="description">description</label>
        <textarea name="description" cols="30" rows="2"></textarea>

        <input type="submit" value="submit" />
      </form>
    )
  }
}


export default CreateForm