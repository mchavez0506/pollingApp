import React, { Component } from "react";
import Display from "./Display";

class Join extends Component {
  state = {
    fullName: ""
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  join = () => {
    console.log(this.state.fullName);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
        <form className="col-md-6 offset-3" action="javascript:void(0)" onSubmit={this.join}>
          <div className="form-group">
            <label className="d-flex align-self-start">Full Name</label>
            <input
              ref="name"
              name="fullName"
              className="form-control"
              onChange={this.handleChange}
              placeholder="enter your full name..."
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
export default Join;
