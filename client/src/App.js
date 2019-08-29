import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Audience from "./components/Audience";
import Speaker from "./components/Speaker";
import Board from "./components/Board";
import "./App.css";
import Header from "./components/Header";

class App extends Component {
  state = {
    endpoint: "localhost:8082",
    connected: "disconnected",
    title: "",
    messages: [],
    message: "",
    color: "white",
    member: {},
    speaker: {},
    audience: []
  };

  componentWillMount = () => {
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on("connect", this.connect);
    this.socket.on("joined", this.joined)
    this.socket.on("disconnect", this.disconnect);
    this.socket.on("welcome", this.welcome);
    this.socket.on("audience", this.updateAudience)
  };

  connect = () => {
    const member = sessionStorage.member ? JSON.parse(sessionStorage.member) : null

    if(member){
      this.emit("join", member)
    }

    this.setState({ status: "connected" });
    console.log("connected: ", this.socket.id);
  };

  welcome = serverState => {
    this.setState({ title: serverState.title });
  };

  joined = (member) =>{
    sessionStorage.member = JSON.stringify(member)
    this.setState({member})
  }

  updateAudience = (newAudience) =>{
    this.setState({audience:newAudience})
  }

  emit = (eventName, payload) =>{
    this.socket.emit(eventName,payload)
  }

  disconnect = () => {
    this.setState({ status: "disconnected" });
  };

  render() {
    return (
      <div className="App">
        <Header title={this.state.title} status={this.state.status}></Header>

        <Router>
          <Route exact path="/" render={(props)=> <Audience emit={this.emit} {...this.state}/>} />
          <Route exact path="/board" render={(props)=> <Board {...this.state}/>} />
          <Route exact path="/speaker" render={(props)=> <Speaker emit={this.emit} {...this.state}/>} />
        </Router>
      </div>
    );
  }
}

export default App;
