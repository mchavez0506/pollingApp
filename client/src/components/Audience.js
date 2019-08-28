import React, { Component } from "react";
import Display from "./Display"

class Audience extends Component {
  render() {
    return (
      <div>
        <Display if={this.props.status === "connected"}>
          <h1>Join the session</h1>
        </Display>
      </div>
    );
  }
}
export default Audience;
