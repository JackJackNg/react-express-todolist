import React from 'react';
import BaseForm from './base/BaseForm'
import axios from 'axios'

class RegisterForm extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleRegister = this.handleRegister.bind(this)
  }

  render() {
    return (
      <form method="POST" action="" onSubmit={this.handleRegister}>
       <label htmlFor="username">user name</label>
        <input type="text" name='username' ref={ref => this.inputUsername = ref} />
        <br />

        <label htmlFor="username">Password</label>
        <input type="password" name="password" defaultValue="12345" ref={ref => this.inputPassword = ref} />
        <input type="submit" value="Register" />

      </form>
    )
  }

  async handleRegister(e) {
    e.preventDefault()
    e.persist()

    const url = 'http://localhost:3000/user/register'
    const username = this.inputUsername.value 
    const password = this.inputPassword.value
    const data = { username: username, password: password }
    const config = { headers: {'content-type': 'application/json'} }

    const {status} = await axios.post(url,data,config)
    if (status === 201) {
      this.onSuccess()
      return
    }
  }
}

export default RegisterForm