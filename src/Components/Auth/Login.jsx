import React, { Component } from 'react';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';
import login from '../../graphql/mutations/login';
import { updateCurrentUser } from '../../graphql/mutations/updateCurrentUser';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  async handleLoginSubmit(e) {
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
        // this.props.client.resetStore();
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

  render() {
    return (
      <div className="loginimg">
        <div className="login-form-container text-center">
          <form 
            className="auth-form"
            onSubmit={this.handleLoginSubmit}
          >
            <h1 className="logsig">Login</h1>
            <div className="row justify-content-center align-self-center">
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={this.handleChange}
                className="col-sm-2 offset-sm rounded"
              />
            </div>
            <Link to="/login/forgot" href="/login/forgot" >
              <h5>Forgot your password ?</h5>
            </Link>
            <div className="row justify-content-center align-self-center"> 
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={this.handleChange}
                className="col-sm-2 offset-sm rounded"
              />
            </div>
            <div className="row justify-content-center align-self-center">
              <button
                color="white"
                text="Log In"
                onClick={this.handleLoginSubmit}
                className="btn btn-outline-info col-sm-2 offset-sm"
              >Login
              </button>
            </div>
          </form>

          <h5>
            Don't have an account? 
            <Link to="/sign">
              <div className="auth-link"> Sign up </div>
            </Link>
          </h5>
        </div>
      </div>  
    );  
  }
}


const WrapedLogin = compose(
  graphql(login, { name: 'loginMutation' }),
  graphql(updateCurrentUser, { name: 'updateCurrentUserMutation' }),
)(Login);


export default withApollo(WrapedLogin);
