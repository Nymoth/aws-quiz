import React from 'react';

import Label from './Label/';

const QuestionLabels = props => (
  <div>
    {props.labels.map(label => <Label label={label.name} key={label.id} />)}
  </div>
)

export default QuestionLabels;
