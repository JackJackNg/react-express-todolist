import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [{ _id: '123412', username: 'Jack' }]
    }
  }
  render() {
    // TO DO : add in task api 
    const users = this.state.users.map((element) => {
      return (
        <div key={element._id}>
          <div>{element._id}: {element.username}</div>
          <button>Is done</button>
        </div>)
    })


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        {users}
      </div>
    );
  }

  componentWillMount() {
    fetch('http://localhost:3001/user',
      {
        method: 'GET'
      })
      .then((response) => {
        console.log(response.status)
        return response.json()
      })
      .then((data) => {
        this.setState({
          users: data
        })
      })
  }
}

export default App;
