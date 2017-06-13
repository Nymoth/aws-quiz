import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import YouTube from 'react-youtube';

import ExternalLink from '../../components/ExternalLink';
import './styles.css';

class Home extends Component {

  state = {
    stage: 0
  }

  componentDidMount() {
    const savedStage = localStorage.getItem('stage');
    if (savedStage !== null) {
      this.setState({ stage: +savedStage });
    }
  }

  setStage = (stage) => {
    this.setState({ stage });
    localStorage.setItem('stage', stage);
  }

  nextStage = () => {
    this.setStage(this.state.stage + 1);
  }

  youtubePlayerOpts = {
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  };

  stages = [
    (
      <div>
        <h1>O hai there!</h1>
        <p>So you want to be an <ExternalLink href="https://aws.amazon.com/certification/certified-solutions-architect-associate/">AWS Certified Solutions Architect</ExternalLink>, dont you?</p>
        <p>And of course, you don't have a single idea on what AWS is, right?</p>
        {/*<p>But anyway, who cares? Certifications are easy, right?</p>*/}
        <span>Maybe I can help y</span>
        <RaisedButton className="inline-button" label="Shut up, I'm so ready" primary={true} onTouchTap={this.nextStage} />
      </div>
    ),
    (
      <YouTube
        videoId="_p73PZIDQuA"
        opts={this.youtubePlayerOpts}
        onEnd={this.nextStage}
        onError={this.nextStage} />
    ),
    (
      <div>
        <img src="images/not-prepared.png" alt="You are not prepared" className="not-prepared-image" />
        <p>Okay son... take it easy.</p>
        <p>There are better ways to waste $150.</p>
        <p>Consider taking <ExternalLink href="https://acloud.guru/learn/aws-certified-solutions-architect-associate">Ryan Kroonenburg's course</ExternalLink>,
        reading <ExternalLink href="https://www.amazon.com/dp/1119138558">this book</ExternalLink>,
        or checking the <ExternalLink href="https://aws.amazon.com/documentation/">AWS documentation</ExternalLink> first.</p>
        <p>Trust me, those will really help. And don't forget to play around in the AWS console, and get used with the stuff you are actually studiyng. What else is all this about then?</p>
        <RaisedButton label="OK, Now I'm totally prepared" primary={true} onTouchTap={this.nextStage} />
      </div>
    ),
    (
      <div>
        <h1>Wait a second</h1>
        <p>Why don't you take this quiz I made for you, just to be sure you are really prepared?</p>
        <RaisedButton label="Whatever... I'll take it" primary={true} containerElement={<Link to="/quiz" />} />
      </div>
    )
  ];

  render() {
    return (
      <div className="stage-wrapper">
        {this.stages[this.state.stage]}
      </div>
    );
  }

}

export default Home;
