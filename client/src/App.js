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
    speaker: "",
    audience: [],
    questions:[],
    currentQuestion:false 
  };

  componentWillMount = () => {
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on("connect", this.connect);
    this.socket.on("joined", this.joined);
    this.socket.on("disconnect", this.disconnect);
    this.socket.on("welcome", this.updateState);
    this.socket.on("audience", this.updateAudience);
    this.socket.on("start", this.start);
    this.socket.on("end", this.updateState);
    this.socket.on("ask",this.ask )
  };

  connect = () => {
    const member = sessionStorage.member
      ? JSON.parse(sessionStorage.member)
      : null;

    if (member && member.type === "audience") {
      this.emit("join", member);
    } else if (member && member.type === "speaker"){
      this.emit("start", {name: member.name, title: sessionStorage.title})
    }

    this.setState({ status: "connected" });
    console.log("connected: ", this.socket.id);
  };

  updateState = serverState => {
    console.log(serverState)
    this.setState(serverState);
  };

  joined = member => {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member });
  };

  updateAudience = newAudience => {
    this.setState({ audience: newAudience });
  };

  start = presentation => {
    if (this.state.member.type === "speaker") {
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation)
  };

  ask = question =>{
    this.setState({currentQuestion:question})
  }

  emit = (eventName, payload) => {
    this.socket.emit(eventName, payload);
  };

  disconnect = () => {
    this.setState({ status: "disconnected", title: "disconnected", speaker: "" });
  };

  render() {
    return (
      <div className="App">
        <Header {...this.state} />

        <Router>
          <Route
            exact
            path="/"
            render={props => <Audience emit={this.emit} {...this.state} />}
          />
          <Route
            exact
            path="/board"
            render={props => <Board {...this.state} />}
          />
          <Route
            exact
            path="/speaker"
            render={props => <Speaker emit={this.emit} {...this.state} />}
          />
        </Router>
      </div>
    );
  }
}

export default App;
