import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import QuestionLabels from '../../../../components/QuestionLabels';
import './styles.css';

class QuestionList extends Component {

  state = {
    correctAnswersVisible: false
  }

  toggleCorrectAnswers = () => {
    this.setState({ correctAnswersVisible: !this.state.correctAnswersVisible });
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.question.title}
          subtitle={<QuestionLabels labels={this.props.question.labels} />}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <ol type="A">
            {
              this.props.question.answers.map(answer => {
                const correctAnswerClass = this.props.question.correctAnswers.includes(answer.id) ? 'correct' : '';
                const visibleCorrectAnswerClass = this.state.correctAnswersVisible ? 'visible' : '';
                return (
                  <li className={`answer ${correctAnswerClass} ${visibleCorrectAnswerClass}`} key={answer.id}>{answer.text}</li>
                );
              })
            }
          </ol>
          {this.state.correctAnswersVisible ? <p>{this.props.question.desc}</p> : ''}
          <FlatButton label={`${this.state.correctAnswersVisible ? 'Hide' : 'Show'} correct answers`} onTouchTap={this.toggleCorrectAnswers} />
        </CardText>
      </Card>
    )
  }
}

export default QuestionList;
