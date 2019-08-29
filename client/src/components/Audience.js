import React, { Component } from "react";
import Display from "./Display";
import Join from "./Join";
import Ask from "./Ask";

class Audience extends Component {
  render() {
    return (
      <div className="container">
        {this.props.member.name ? (
          <React.Fragment>
            <h2>Welcome {this.props.member.name}</h2>
            <p>{`${this.props.audience.length} audience members connected`}</p>
            {this.props.currentQuestion ? (
              <Ask
                emit={this.props.emit}
                choices={this.props.choices}
                answer={this.props.answer}
                selectChoice={this.props.selectChoice}
                question={this.props.currentQuestion}
              />
            ) : (
              <p>Questions will appear here</p>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>Join the session</h1>
            <Join emit={this.props.emit} />
          </React.Fragment>
        )}
        {/* <Display if={this.props.status === "connected"}> */}
        {/* <Display>
            {this.props.member ? (
              <React.Fragment>
                <h2>Welcome {this.props.member.name}</h2>
                <p>Questions will appear here</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1>Join the session</h1>
                <Join emit={this.props.emit} />
              </React.Fragment>
            )}
          </Display> */}
        {/* <Display if={this.props.member.name}>
            <h2>Welcome {this.props.member.name}</h2>
            <p>Questions will appear here</p>
          </Display>
          <Display if={!this.props.member.name}>
            <h1>Join the session</h1>
            <Join emit={this.props.emit} />
          </Display> */}
        {/* </Display> */}
      </div>
    );
  }
}
export default Audience;
