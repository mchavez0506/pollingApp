import React, { Component } from "react";

class Ask extends Component {
  state = {
    choices: [],
    answer: null
  };

  // componentDidMount() {
  //   this.setChoices();
  // }

  // componentDidUpdate() {
  //   console.log(sessionStorage.answer);
  //   if (!sessionStorage.answer) {
  //     this.setChoices();
  //   }
  // }

  // setChoices = () => {
  //   const choices = Object.keys(this.props.question);
  //   choices.shift();
  //   this.setState({ choices: choices, answer: sessionStorage.answer });
  // };

  // selectChoice = choice => {
  //   sessionStorage.answer = choice;
  //   this.setState({ answer: choice });
  //   this.props.emit("answer", {
  //     question: this.props.question,
  //     choice: choice
  //   });
  // };

  addChoiceBtn = (choice, i) => {
    const btnTypes = ["primary", "success", "warning", "danger"];
    return (
      <button
        key={i}
        className={`col-xs-12 col-sm-6 btn btn-${btnTypes[i]}`}
        onClick={() => this.props.selectChoice(choice)}
      >{`${choice}: ${this.props.question[choice]}`}</button>
    );
  };

  render() {
    return (
      <div id="currentQuestion" className="container">
        {this.props.answer ? (
          <>
            <h3>You answered: {this.props.answer}</h3>
            <p>{this.props.question[this.props.answer]}</p>
          </>
        ) : (
          <>
            <h2>{this.props.question.q}</h2>
            <div className="row">
              {this.props.choices.map(this.addChoiceBtn)}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Ask;
