import React, { Component } from "react";
import Display from "./Display";

class JoinSpeaker extends Component {
  state = {
    fullName: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  start = () => {
   const {title, speakerName} = this.state
   this.props.emit("start", {name: speakerName, title})
  };

  render() {
    return (
      <div className="container">
        <div className="row">
        <form className="col-md-6 offset-3" action="javascript:void(0)" onSubmit={this.start}>
          <div className="form-group">
            <label className="d-flex align-self-start">Full Name</label>
            <input
              ref="name"
              name="speakerName"
              className="form-control"
              onChange={this.handleChange}
              placeholder="enter your full name..."
              required
            />
          </div>
          <div className="form-group">
            <label className="d-flex align-self-start">Title</label>
            <input
              ref="name"
              name="title"
              className="form-control"
              onChange={this.handleChange}
              placeholder="enter title for presntation..."
              required
            />
          </div>
          <button type="submit" className=" d-flex btn btn-primary">Join</button>
        </form>
        </div>
      </div>
    );
  }
}
export default JoinSpeaker;
