import React, { Component } from "react";
import JoinSpeaker from "./JoinSpeaker";

class Speaker extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.status === "connected" ? (
          this.props.member.name && this.props.member.type === "speaker" ? (
            <React.Fragment>
              <p>Questions</p>
              <p>Attendance</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Start the presentation</h2>
              <JoinSpeaker emit={this.props.emit}/>
            </React.Fragment>
          )
        ) : null}
      </React.Fragment>
    );
  }
}
export default Speaker;
