import React, { Component } from 'react';
import decode from 'jwt-decode';
import { graphql, compose, withApollo } from 'react-apollo';
import { Button, Typography, TextField } from '@material-ui/core';
import login from '../../graphql/mutations/login';
import ForgotPassword from './ForgotPassword';
import { updateCurrentUser } from '../../graphql/mutations/updateCurrentUser';
import './auth.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    forgot: false,
  };

  handleChange = event => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value }, console.log(this.state));
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;

    if (email === '' || password === '') {
      return;
    }
    
    let token = localStorage.getItem('token');

    if (token) {
      const { exp } = decode(token);
      if (exp < new Date().getTime() / 1000) {
        await localStorage.removeItem('token');
      }
    }

    token = await this.props.loginMutation({
      variables: {
        email,
        password,
      },
    });

    if (token) {
      localStorage.setItem('token', token.data.login);
      const { id } = await decode(token.data.login).user;
      await this.props.updateCurrentUserMutation({
        variables: {
          id,
          username: '',
          publicId: '',
          notificationId: '',
          convoListId: '',
        },
      });
      this.props.history.push('/homepage');
    }
  }

  renderForgot = (e) => {
    e.preventDefault();
    this.setState({
      forgot: true,
    })
  }

  render() {
    if (this.state.forgot) {
      return <ForgotPassword />
    }
    return (
      <div>
        <Typography variant="display3" gutterBottom color="primary" >Log in</Typography>
        <div className="form-container">   
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Email Address"
            type="email"
            onChange={this.handleChange}
          />
          <TextField
            margin="normal"
            id="nae"
            label="Passord"
            type="password"
            onChange={this.handleChange}
          />
          <div className="forgot" onClick={this.renderForgot}>
            <a href="#"><Typography variant="body2" gutterBottom color="primary" >Forgot your password ?</Typography></a>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleLoginSubmit}
        >Login
        </Button>
      </div>  
    );  
  }
}


const WrapedLogin = compose(
  graphql(login, { name: 'loginMutation' }),
  graphql(updateCurrentUser, { name: 'updateCurrentUserMutation' }),
)(Login);


export default withApollo(WrapedLogin);
