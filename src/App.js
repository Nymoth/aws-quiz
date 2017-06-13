import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom'

import getQuestions from './services/questions'
import Layout from './components/Layout/';
import Home from './scenes/Home/';
import List from './scenes/List/';
import Quiz from './scenes/Quiz/';
import './App.css';

class App extends Component {

  state = {
    data$: getQuestions()
  }

  render() {
    return (
      <HashRouter>
        <Layout>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/list" render={() => <List data={this.state.data$} />} />
          <Route exact={true} path="/quiz" component={() => <Quiz data={this.state.data$} />} />
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
