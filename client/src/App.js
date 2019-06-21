import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import Header from './components/Header'

class App extends Component {
  state = {
    endpoint: "localhost:8082",
    connected: 'disconnected',
    messages: [],
    message: "",
    color: "white",
    isLoggedIn: false,
    userName: "",
    users: []
  };

  componentWillMount = () =>{
    this.socket = socketIOClient(this.state.endpoint)
    this.socket.on('connect', this.connect)

    this.socket.on('disconnect', this.disconnect)

  }

  connect = () =>{
    this.setState({status:"connected"})
    console.log('connected: ', this.socket.id)
  }

  disconnect = () =>{
    this.setState({status:"disconnected"})

  }

  render() {
    return (
      <div className="App">
        <Header title='new header' status={this.state.status}></Header>
      </div>
    );
  }
}

export default App;
