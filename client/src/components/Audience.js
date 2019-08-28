import React, { Component } from "react";
import Display from "./Display"
import Join from "./Join";


class Audience extends Component {
  render() {
    return (
      <div>
        <Display if={this.props.status === "connected"}>
          <h1>Join the session</h1>
          <Join/>
        </Display>
      </div>
    );
  }
}
export default Audience;
