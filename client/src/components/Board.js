import React, { Component } from "react";


class Board extends Component {
  render() {
    return (
      <div id="scoreboard">
        {this.props.status === "connected" && this.props.currentQuestion ? (
          <React.Fragment>
            <h3>{this.props.currentQuestion.q}</h3>
            <p>{JSON.stringify(this.props.results)}</p>
          </React.Fragment>
        ) : this.props.status === "connected" && !this.props.currentQuestion ? (
          <React.Fragment>
            <h3>Awaiting a Question...</h3>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
export default Board;
