import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';

import QuestionList from './components/QuestionList';
import Label from '../../components/Label';
import './styles.css';

class List extends Component {

  state = {
    questions: [],
    labels: [],
    filterDialogOpen: false,
    textFilter: '',
    labelFilter: {}
  };

  componentDidMount() {
    this.props.data.then(res => {
      const labelFilter = {};
      res.labels.forEach(label => labelFilter[label.id] = true);
      this.setState({ ...this.state, questions: res.questions, labels: res.labels, labelFilter });
    });
  }

  filterByLabels = (q) => {
    for (let i = 0; i < q.labels.length; i++) {
      if (this.state.labelFilter[q.labels[i].id]) {
        return true;
      }
    }
    return false;
  }

  filterByQuestionName = (q) => {
    return q.title.toLowerCase().includes(this.state.textFilter.toLowerCase());
  }

  changeTextFilter = evt => {
    const textFilter = evt.target.value;
    this.setState({ ...this.state, textFilter });
  }

  changeLabelFilter = (labelId) => {
    const labelFilter = this.state.labelFilter;
    labelFilter[labelId] = !labelFilter[labelId];
    this.setState({ ...this.state, labelFilter });
  }

  openFilterDialog = () => {
    this.setState({ ...this.state, filterDialogOpen: true });
  }

  closeFilterDialog = () => {
    this.setState({ ...this.state, filterDialogOpen: false });
  }

  render() {
    const anyFilterActive = this.state.textFilter !== '' || !Object.values(this.state.labelFilter).reduce((a, b) => a && b, true)
    const filterDialogActions = [
      <FlatButton label='Close' onTouchTap={this.closeFilterDialog} />
    ]
    return (
      <div>
        <FloatingActionButton className="toggle-filters" secondary={anyFilterActive} onTouchTap={this.openFilterDialog}>
          <ContentFilterList />
        </FloatingActionButton>
        <Dialog
          open={this.state.filterDialogOpen}
          onRequestClose={this.closeFilterDialog}
          actions={filterDialogActions}>
          <div className="filters-dialog">
            <TextField
              floatingLabelText="Filter by question statement"
              value={this.state.textFilter}
              onChange={this.changeTextFilter}
              fullWidth={true} />
            <div className="topic-list">
              <p>Filter by topic</p>
              {this.state.labels.map(label => (
                <Checkbox
                  key={label.id}
                  labelStyle={{ marginTop: '-8px' }}
                  checked={this.state.labelFilter[label.id]}
                  onCheck={() => this.changeLabelFilter(label.id)}
                  label={<Label label={label.name} />} />
              ))}
            </div>
          </div>
        </Dialog>
        <div>
          {
            this.state.questions
              .filter(this.filterByQuestionName)
              .filter(this.filterByLabels)
              .map(q =>
                <div key={q.id}>
                  <QuestionList question={q} />
                </div>
              )
          }
        </div>
      </div>
    );
  }

}

export default List;
