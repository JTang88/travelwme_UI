import React, { Component } from 'react';
import decode from 'jwt-decode';
import { withRouter } from 'react-router';
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

  handleChange = (event) => {
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
        this.props.client.resetStore();
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
    console.log('props in login', this.props)
    if (this.state.forgot) {
      return <ForgotPassword />
    }
    return (
      <div>
        <Typography variant="display3" gutterBottom color="primary" >Log in</Typography>
        <div className="form-container">   
          <TextField
            autoFocus
            required
            margin="normal"
            id="email"
            label="Email"
            type="text"
            name="email"
            onChange={this.handleChange}
          />
          <TextField
            margin="normal"
            required
            id="password"
            label="Password"
            type="password"
            name="password"
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
)(withRouter(Login));


export default withApollo(WrapedLogin);
