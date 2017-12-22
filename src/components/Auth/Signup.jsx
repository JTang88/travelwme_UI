import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  async handleSignupSubmit(e) {
    e.preventDefault();
    const {
      username,
      email,
      password,
    } = this.state;

    if (username === '' || email === '' || password === '') {
      return;
    }

    await this.props.mutate({
      variables: {
        username,
        email,
        password,
      },
    });
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="signup-form-container text-center signupimg">
        <form 
          className="auth-form"
          // onSubmit={this.handleSignupSubmit}
        >
          <h1 className="logsig">Sign Up</h1>
          <div className="row justify-content-center align-self-center">
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={this.handleChange}
              className="col-sm-2 offset-sm rounded"
            />
          </div>
          <div className="row justify-content-center align-self-center">  
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              className="col-sm-2 offset-sm rounded"
            />
          </div>  
          <div className="row justify-content-center align-self-center">
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
              className="col-sm-2 offset-sm rounded"
            />
          </div>
          <div>  
            <button
              color="yellow"
              text="Sign Up"
              onClick={this.handleSignupSubmit}
              className="btn btn-outline-info col-sm-2 offset-sm"
            >Sign Up</button>
          </div>  
        </form>
        <h5>
          Already have an account? 
          <Link to="/login">
            <div> Login </div>
          </Link>
        </h5>
      </div>
    );
  }
}

const register = gql`
mutation register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    id
  }
}
`;

const SignupWithMutation = graphql(register)(Signup);

export default SignupWithMutation;
