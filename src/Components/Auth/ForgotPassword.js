import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Typography, Button, TextField } from '@material-ui/core';
import Login from './Login';
import forgotPassword from '../../graphql/mutations/forgotPassword';

class ForgotPassword extends Component {
  state = {
    sent: false,
    backToLogin: false,
  }

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }
  
  handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    await this.props.mutate({
      variables: {
        email: this.state.email,
      },
    });
    this.setState({
      sent: true,
    });
  }

  backToLogin = (e) => {
    e.preventDefault();
    this.setState({
      backToLogin: true,
    })
  }

  render() {
    if (this.state.backToLogin) {
      return <Login />
    } else if (this.state.sent && !this.state.backToLogin) {
      return (
        <div>
          <Typography 
            color="primary" 
            variant="title" 
            gutterBottom
            >
            Your temporary passoword has been sent
          </Typography>
          <div onClick={this.backToLogin}>
            <a href="#">
              <Typography 
                variant="body2" 
                gutterBottom 
                color="primary" 
              >
                Log in
              </Typography>
            </a>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Typography
          variant="title"
          color="primary"
          gutterBottom
        >
          Forgot your password ?
        </Typography>
        <Typography
          variant="subheading"
          color="primary"
          gutterBottom
        >
          Enter your email address below. We'll email you a temporary password and instructions on how to change your password
        </Typography>
        <div>
          <TextField
            margin="normal"
            required
            id="email"
            label="Email"
            type="text"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleForgotPasswordSubmit}
        >
          Submit
        </Button>
        <div className="login-route" onClick={this.backToLogin}>
          <a href="#">
            <Typography 
              variant="body2" 
              gutterBottom 
              color="primary" 
            >
              Log in
            </Typography>
          </a>
        </div>
      </div>
    )
  }
};

const wrappedForgotPassword = graphql(forgotPassword)(ForgotPassword);

export default wrappedForgotPassword;