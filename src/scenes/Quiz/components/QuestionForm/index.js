import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { lightGreen900 } from 'material-ui/styles/colors';

import './styles.css';

class QuestionForm extends Component {

  state = {
    answers: [],
    wrongNumberAnswersChosen: false,
    answerSubmitted: false,
    answeredCorrectly: false,
  }

  changeRadioOption = evt => {
    const answers = [ evt.target.value ];
    this.setState({ ...this.state, answers });
  }

  changeCheckboxOption = (id, isChecked) => {
    let answers;
    if (isChecked) {
      answers = [ ...this.state.answers, id ];
    } else {
      answers = this.state.answers.filter(a => a !== id);
    }
    this.setState({ ...this.state, answers });
  }

  submitQuestion = () => {
    const wrongNumberAnswersChosen = this.state.answers.length !== this.props.question.correctAnswers.length;
    const newState = { ...this.state, wrongNumberAnswersChosen };
    if (!wrongNumberAnswersChosen) {
      const answeredCorrectly = this.isCorrectAnswer();
      newState.answeredCorrectly = answeredCorrectly;
      newState.answerSubmitted = true;
      this.props.submitQuestion(answeredCorrectly);
    }
    this.setState(newState);
  }

  isCorrectAnswer = () => {
    return this.state.answers
      .map(id => this.props.question.correctAnswers.includes(id))
      .reduce((a, b) => a && b);
  }

  nextQuestion = () => {
    this.props.nextQuestion();
    this.setState({ answers: [], wrongNumberAnswersChosen: false, answerSubmitted: false, answeredCorrectly: false });
  }

  render() {
    const numCorrectAnswers = this.props.question.correctAnswers.length;
    const correctAnswerStyle = { color: lightGreen900, fontWeight: 'bold' };
    return (
      <div>
        <h3>{this.props.question.title}</h3>
        <div>
          <p className={this.state.wrongNumberAnswersChosen ? 'wrongNumberAnswersChosen' : ''}>{`Choose ${numCorrectAnswers}.`}</p>
          {
            numCorrectAnswers === 1 ? (
              <RadioButtonGroup name="answers" valueSelected={this.state.answers[0]} onChange={this.changeRadioOption}>
                {
                  this.props.question.answers.map((answer, i) => (
                    <RadioButton
                      key={answer.id}
                      label={answer.text}
                      labelStyle={this.state.answerSubmitted && this.props.question.correctAnswers.includes(answer.id) ? correctAnswerStyle : null}
                      disabled={this.state.answerSubmitted}
                      value={answer.id} />
                    )
                  )
                }
              </RadioButtonGroup>
            ) : (
              this.props.question.answers.map((answer, i) => (
                <Checkbox
                  key={answer.id}
                  label={answer.text}
                  labelStyle={this.state.answerSubmitted && this.props.question.correctAnswers.includes(answer.id) ? correctAnswerStyle : null}
                  checked={this.state.answers.includes(answer.id)}
                  disabled={this.state.answerSubmitted}
                  onCheck={(evt, isChecked) => this.changeCheckboxOption(answer.id, isChecked)} />
                )
              )
            )
          }
        </div>
        {
          this.state.answerSubmitted ? (
            <div>
              {this.state.answeredCorrectly ? <p className="correctAnswerMsg">That's correct! Yeah!!</p> : <p className="wrongAnswerMsg">Wrong!!!1!</p>}
              <RaisedButton className="submitButton" label="Next question" primary={true} onTouchTap={this.nextQuestion} />
            </div>
          ) : (
            <RaisedButton className="submitButton" label="Submit" primary={true} onTouchTap={this.submitQuestion} />
          )
        }
      </div>
    );
  }
}

export default QuestionForm;
