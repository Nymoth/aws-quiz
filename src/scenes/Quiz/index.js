import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import RaisedButton from 'material-ui/RaisedButton';

import QuestionForm from './components/QuestionForm/';
import QuizProgress from './components/QuizProgress';

class Quiz extends Component {

  questions = [];

  state = {
    questions: [],
    currentQuestionIndex: 0,
    completedQuestions: [],
    optionsOpen: false
  };

  componentDidMount() {
    const rawSavedQuiz = localStorage.getItem('quiz');
    let completedQuestions = [];
    if (rawSavedQuiz) {
      completedQuestions = JSON.parse(rawSavedQuiz);
    }

    this.props.data.then(res => {
      this.questions = res.questions;
      const questions = shuffle(res.questions.filter(q => completedQuestions.find(cq => cq.id === q.id) === undefined));
      this.setState({ ...this.state, questions, completedQuestions });
    });
  }

  submitQuestion = correct => {
    const completedQuestions = [ ...this.state.completedQuestions, { id: this.state.questions[this.state.currentQuestionIndex].id, correct } ];
    localStorage.setItem('quiz', JSON.stringify(completedQuestions));
    this.setState({ ...this.state, completedQuestions })
  }

  nextQuestion = () => {
    this.setState({ ...this.state, currentQuestionIndex: this.state.currentQuestionIndex + 1 });
  }

  resetQuiz = () => {
    localStorage.removeItem('quiz');
    this.setState({ questions: this.questions, currentQuestionIndex: 0, completedQuestions: [] });
  }

  render() {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    const finished = this.questions.length > 0 && this.questions.length === this.state.completedQuestions.length;
    return (
      finished ? (
        <div>
          <h3>That's it!</h3>
          <p>You got {this.state.completedQuestions.filter(cq => cq.correct).length}/{this.questions.length} correct answers!</p>
          <RaisedButton label="Start again" primary={true} onTouchTap={this.resetQuiz} />
        </div>
      ) : (
        <div>
          <QuizProgress answeredQuestions={this.state.completedQuestions.length} totalAnswers={this.questions.length} />
          {!!currentQuestion ? <QuestionForm question={currentQuestion} submitQuestion={this.submitQuestion} nextQuestion={this.nextQuestion} /> : <p>Loading...</p>}
        </div>
      )
    );
  }
}

export default Quiz;
