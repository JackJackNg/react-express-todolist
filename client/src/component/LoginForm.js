import React from 'react';
import BaseForm from './base/BaseForm'
import axios from 'axios'

class LoginForm extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleLogIn = this.handleLogIn.bind(this)
  }

  render() {
    const username = 'jack'
    const password = '12345'

    return (
      <form method="POST" action="" onSubmit={this.handleLogIn}>
        <label htmlFor="username">user name</label>
        {/* <input type="text" name='username' value="">  */}
        <input type="text" name='username' defaultValue="jack" ref={ref => this.inputUsername = ref} />
        <br />

        <label htmlFor="username">Password</label>
        {/* <input type="password" name="password" value="">  */}
        <input type="password" name="password" defaultValue="12345" ref={ref => this.inputPassword = ref} />
        <input type="submit" value="login" />
      </form>
    )
  }

  handleLogIn(e) {
    e.preventDefault()
    e.persist()
    axios.post('http://localhost:3001/user/login', {
      username: this.inputUsername.value,
      password: this.inputPassword.value
    }).then(({ status }) => {
      if (status === 200) {
        console.log(status) 
        this.onSubmit(e, true)
        return
      }
    })
  }
}

export default LoginForm 