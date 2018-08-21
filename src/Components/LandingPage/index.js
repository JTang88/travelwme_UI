import React, { Component } from 'react';
import { Typography, Button, withStyles, Modal } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import checkAuth from '../../services/checkAuth';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import './landing.css';


const styles = theme => ({
  paper: {
    textAlign: 'center',
    outline: 'none',
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    borderRadius: '30px',
    border: '3px solid #ce1971',
  },
});

class Landing extends Component {
  state = {
    open: false,
    login: true,
  };

  handleOpenLogin = () => {
    this.setState({ login: true })
    this.setState({ open: true });
  };

  handleOpenSignup = () => {
    this.setState({ login: false })
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      checkAuth() ? <Redirect to={{ pathname: '/homepage' }} /> :
      <div className="landing">
        <div className="landing-nav">
          <Button 
            variant="text" 
            size="large" 
            color="inherit">
            about
          </Button>
          <Button 
            variant="text" 
            size="large" 
            color="inherit" >
            blog
          </Button>
          <Button 
            variant="text" 
            size="large" 
            color="inherit"
            onClick={this.handleOpenSignup}>
            sign up
          </Button>
          <Button 
            variant="text" 
            size="large" 
            color="inherit" 
            onClick={this.handleOpenLogin}>
            log in
          </Button>
        </div>
        <div className="clearfix" />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          {
            this.state.login ? 
              <div className={classes.paper}>
                <Login/> 
              </div>
              : 
                <div className={classes.paper}>
                < Signup />
              </div>
          }
        </Modal> 
        <div className="landing-text-container">
          <Typography variant="display3" gutterBottom color="inherit">
            <strong>
              Going on a #Adventure <br />
              Experience the World <br />
              Making Friends of a Life Time
            </strong>
          </Typography>
        </div>
        <div className="center-button">
          <div onClick={this.handleOpenLogin} className="btn-full">
            Log in
          </div>
          <div onClick={this.handleOpenSignup} className="btn-ghost"> 
            Sign up 
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);