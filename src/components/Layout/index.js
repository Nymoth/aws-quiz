import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionList from 'material-ui/svg-icons/action/list';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

import './styles.css';

class Layout extends Component {

  state = {
    drawerOpen: false
  }

  toggleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  render() {
    return (
      <div>
        <AppBar
          title="AWS Quiz"
          iconElementLeft={<img src="images/icon-aws.png" height="50" alt="AWS logo" />}
          iconElementRight={<IconButton onTouchTap={this.toggleDrawer}><NavigationMenu /></IconButton>} />

        <Drawer
          docked={false}
          open={this.state.drawerOpen}
          onRequestChange={drawerOpen => this.setState({ drawerOpen })}
          openSecondary={true}>
          <AppBar
            iconElementLeft={<span></span>}
            iconElementRight={<IconButton onTouchTap={this.toggleDrawer}><NavigationClose /></IconButton>} />
          <Link to="/" onTouchTap={this.toggleDrawer}><MenuItem leftIcon={<ActionHome />}>Home</MenuItem></Link>
          <Link to="/quiz" onTouchTap={this.toggleDrawer}><MenuItem leftIcon={<AvPlayArrow />}>Quiz</MenuItem></Link>
          <Link to="/list" onTouchTap={this.toggleDrawer}><MenuItem leftIcon={<ActionList />}>Questions list</MenuItem></Link>
        </Drawer>

        <div className="content">
          <Paper className="content-wrapper">
            {this.props.children}
          </Paper>
        </div>
      </div>
    );
  }
}

export default Layout;
