import React, { Component } from 'react'
import CreateForm from './component/CreateForm'
import LoginForm from './component/LoginForm'
import RegisterForm from './component/RegisterForm'
import ToDoList from './component/ToDoList'
import './App.css'
import 'bulma'
import logo from './logo.svg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
    this.logInSuccess = this.logInSuccess.bind(this)
    this.createTaskSuccess = this.createTaskSuccess.bind(this)
  }

  render() {
    const login = this.state.isLogin ? (<h1>Loged in </h1>)
                                      : (<div>
                                          <h2>login</h2>
                                          <LoginForm onSuccess={this.logInSuccess}/>
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

            <h1>Register</h1>
            <RegisterForm onSuccess={this.registerSuccess}/> 

            <h1>create todo</h1>
            <CreateForm onSuccess={this.createTaskSuccess}/> 

          </div>
                  
          <div className="column is-half">
            <ToDoList ref={ref => this.toDoList = ref} /> 
          </div>

        </div>
      </div>
    )
  }
  
  createTaskSuccess () {
    console.log('isCreated')    
    this.toDoList.update()
  }

  logInSuccess () {
    this.setState({
      isLogin : true 
    })
  }

  registerSuccess (e, isRegister) {
    console.log('Registered', isRegister)
  }

  componentDidMount() {
    console.log(this.toDoList)
  }

}

export default App
