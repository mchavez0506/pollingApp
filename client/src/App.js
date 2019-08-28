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
    isLoggedIn: false,
    userName: "",
    users: []
  };

  componentWillMount = () => {
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on("connect", this.connect);

    this.socket.on("disconnect", this.disconnect);
    this.socket.on("welcome", this.welcome);
  };

  connect = () => {
    this.setState({ status: "connected" });
    console.log("connected: ", this.socket.id);
  };

  welcome = serverState => {
    this.setState({ title: serverState.title });
  };

  disconnect = () => {
    this.setState({ status: "disconnected" });
  };

  render() {
    return (
      <div className="App">
        <Header title={this.state.title} status={this.state.status}></Header>

        <Router>
          <Route exact path="/" render={(props)=> <Audience {...this.state}/>} />
          <Route exact path="/board" render={(props)=> <Board {...this.state}/>} />
          <Route exact path="/speaker" render={(props)=> <Speaker {...this.state}/>} />
        </Router>
      </div>
    );
  }
}

export default App;
