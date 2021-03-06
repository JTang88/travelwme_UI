import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { 
  Typography, 
  Grid,
  Menu, 
  MenuItem,
  Badge,
  withStyles
} from '@material-ui/core/';
import BarButton from '../../Global/BarButton';
import Notifications from './Notifications';
import './navbar.css';
import MessageList from './MessageList';
import UserBox from './UserBox';


const styles = {
  root: {
    marginLeft: 10,
  },
  badgeRoot: {
    width: 17,
    height: 17,
  }
}

class NavBar extends Component {
  state = {
    anchorEl: null
  };

  handleTripsClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClick = (value) => {
    this.props.history.push(value);
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSelect = value => {
    this.props.history.push(`/homepage/${value}`)
    this.setState({ 
      anchorEl: null, 
    });
  };

  render() {
    const { anchorEl } = this.state;
    const { newMessage, newNotification, classes: { badgeRoot, root } } = this.props;
    console.log('here is props in navBar', this.props);
    return (
      <div className="header-container">
        <header>
          <div className="buttons-container">
            <BarButton onClick={() => this.handleClick('/homepage')}>Home</BarButton>
            <BarButton onClick={() => this.handleClick('/homepage/search')}>Search</BarButton>
            <BarButton onClick={() => this.handleClick('/homepage/plan')}>Plan</BarButton>
            <BarButton onClick={this.handleTripsClick}>Trips</BarButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={() => this.handleSelect('going')}>Going</MenuItem>
              <MenuItem onClick={() => this.handleSelect('created')}>Created</MenuItem>
              <MenuItem onClick={() => this.handleSelect('joined')}>Joined</MenuItem>
              <MenuItem onClick={() => this.handleSelect('waiting')}>Waiting</MenuItem>
            </Menu>
            {
              newNotification ? 
                <Badge 
                  color='primary' 
                  badgeContent='' 
                  classes={{ badge: badgeRoot, root: root }}
                >
                  <Notifications />
                </Badge> : 
                  <Notifications />
            }  
            {
              newMessage ?
                <Badge
                  color='primary'
                  badgeContent=''
                  classes={{ badge: badgeRoot, root: root }}
                >
                  <MessageList />
                </Badge> :
                  <MessageList />
            }
            
            <UserBox />    
          </div>
          <div className="clearfix" />
        </header>
      </div>
     
    );
  }
} 

export default withRouter(withStyles(styles)(NavBar));