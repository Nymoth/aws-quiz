import React from 'react';

import LinearProgress from 'material-ui/LinearProgress';

const QuizProgress = props => {
  const progress = (props.answeredQuestions * 100) / props.totalAnswers;
  return <LinearProgress mode="determinate" value={progress} />;
}

export default QuizProgress;
