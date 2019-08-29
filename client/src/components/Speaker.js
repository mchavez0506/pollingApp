import React, { Component } from "react";
import JoinSpeaker from "./JoinSpeaker";
import Attendance from "./Attendance"
import Questions from "./Questions"

class Speaker extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.status === "connected" ? (
          this.props.member.name && this.props.member.type === "speaker" ? (
            <React.Fragment>
              <Questions emit={this.props.emit} questions={this.props.questions}/>
              <Attendance audience={this.props.audience}/>
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
