import React, { Component } from 'react'
import CreateForm from './component/CreateForm'
import LoginForm from './component/LoginForm'
import ToDoList from './component/ToDoList'
import Axios from 'axios';
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
    // TO DO : Complete to do task api 
    // TO DO : Figure out persistencely store login use so the login page won't not keep refreshing.
    const { users } = this.state
    const userlist = users.map((element) => {
      return (
        <div key={element._id}>
          <div>{element._id}: {element.username}</div>
          <button>Is done</button>
        </div>)
    })


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

        {/* TO DO : when user has loggined before  */}
        <div className="columns">
          <div className="column is-half">
            {login}
            <h1>create todo</h1>
            <CreateForm onSubmit={this.handleCreateTask}/> 
          </div>
          <div className="column is-half">
            <h1>ToDoList</h1>
            <ToDoList/> 
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

  componentWillMount() {

    fetch('http://localhost:3001/user',
      {
        method: 'GET'
      })
      .then((response) => {
        if (response.status === 200)
          return response.json()
      }).then((data) => {
        if (data && data.length > 0)
          this.setState({ users: data })
      })
  }
}

export default App
