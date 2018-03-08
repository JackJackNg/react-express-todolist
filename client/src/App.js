import React, { Component } from 'react'
import CreateForm from './component/CreateForm'
import LoginForm from './component/LoginForm'
import logo from './logo.svg'
import './App.css'
import 'bulma'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [{ _id: '123412', username: 'Jack' }],
      isLoggin: false
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  render() {
    // TO DO : add in task api 
    const { users } = this.state
    const userlist = users.map((element) => {
      return (
        <div key={element._id}>
          <div>{element._id}: {element.username}</div>
          <button>Is done</button>
        </div>)
    })


    const login = this.state.isLoggin ? (<h1>Loged in </h1>)
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
        {login}
        
        <h1>create todo</h1>
        <CreateForm onSubmit={this.handleCreateTask}/> {/* TO DO : when user has loggined before  */}
        {/* {userlist} */}
      </div>
    )
  }
  
  handleCreateTask (e) {
    e.preventDefault() 
    throw new Error('not implemented')
  }

  handleLogin (e,isLoggin) {
    e.preventDefault()  
    this.setState({
      isLoggin : isLoggin
    })
    console.log('islog in',this.state.isLoggin)
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
