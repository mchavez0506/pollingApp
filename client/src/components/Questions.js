import React, { Component } from "react";

class Questions extends Component {
  askQuestion = question => {
      this.props.emit("ask", question)
  };
  render() {
    return (
      <div id="questions" className="row">
        <h2>Questions</h2>
        {this.props.questions.map((question, i) => (
          <div key={i} className="pt-2 col-xs-12 col-sm-6 col-md-3">
            <span onClick={() => this.askQuestion(question) }>{question.q}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Questions;
