import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import './styles.css'

const Label = props => (
  <div className="Label">
    <Chip>
      <Avatar src={`images/aws-icons/${props.label}.svg`} />
      {props.label}
    </Chip>
  </div>
)

export default Label;
