import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  async handleSignupSubmit(e) {
    e.preventDefault();
    const { 
      username,
      password,
    } = this.state;
    const { data } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users`, {
      username,
      password,
    });
    const { accessToken } = data;
    localStorage.setItem('token', accessToken);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="signup-form-container">
        <form 
          className="auth-form"
          onSubmit={this.handleSignupSubmit}
        >
          <h2>Sign Up</h2>
          <p>
            Already have an account?
            <span>
              <Link to ="/login">
                Login
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
            text="Sign Up"
          />
        </form>
      </div>
    );
  }
}

export default Signup;