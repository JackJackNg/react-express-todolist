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
        <input type="button" value="isLogin" onClick={this.testLogIn} />
      </form>
    )
  }

  async handleLogIn(e) {
    e.preventDefault()
    e.persist()
    console.log('handleLogIn', this.inputUsername.value, this.inputPassword.value)
    const {status} = await axios.post('http://localhost:3000/login',{ username: 'jack', password: '12345' },{
      headers: {'content-type': 'application/json'}
      // withCredentials:true
    })
    if (status === 200) {
      // this.onSubmit(e,true)
      return
    }
    
  }

  async testLogIn(e) {
    e.preventDefault()
    e.persist()
    const {status} = await axios.get('http://localhost:3000/isLogin' )
    console.log(status)
  }

  componentDidMount() { 
    console.log('componet will mount')
  }



}

export default LoginForm 