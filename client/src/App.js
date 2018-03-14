import React, { Component } from 'react'
import CreateForm from './component/CreateForm'
import LoginForm from './component/LoginForm'
import ToDoList from './component/ToDoList'
import './App.css'
import 'bulma'
import logo from './logo.svg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [{ _id: '123412', username: 'Jack' }],
      isLogin: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  render() {
    const login = this.state.isLogin ? (<h1>Loged in </h1>)
                                      : (<div>
                                          <h2>login</h2>
                                          <LoginForm onSubmit={this.handleLogin}/>
                                        </div>)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="columns">
          <div className="column is-half">
            {login}
            <h1>create todo</h1>
            <CreateForm onSubmit={this.handleCreateTask}/> 
          </div>
          <div className="column is-half">
            <ToDoList /> 
          </div>
        </div>
      </div>
    )
  }
  
  handleCreateTask (e,isCreated) {
    e.preventDefault()     
    console.log('isCreated',isCreated)    
  }

  handleLogin (e,isLogin) {
    e.preventDefault()  
    this.setState({
      isLogin : isLogin
    })
    console.log('islog in',this.state.isLogin)
  }
}

export default App
