import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  async handleLoginSubmit(e) {
    e.preventDefault();
    const {
      username,
      password,
    } = this.state;
    const { data } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users/auth`, {
      username,
      password,
    });
    const { accessToken } = data;
    localStorage.setItem('token', accessToken);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="login-form-container">
        <form 
          className="auth-form"
          onSubmit={this.handleLoginSubmit}
        >
          <h2>Login</h2>
          <p>
            Don't have an account?
            <span className="auth-link">
              <Link to="/sign">
                Sign up
              </Link>
            </span>
          </p>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <button
            backgroundColor="red"
            color="white"
            text="Log In"
            onClick={this.handleLoginSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Login;