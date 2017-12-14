import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// all you have to do for sign up is to make a post request to the server and store password, email and password. 

class Signup extends Component {
  constructor({ mutate }) {
    super({ mutate });
    this.state = {
      email: '',
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  // async handleSignupSubmit(e) {
  //   e.preventDefault();
  //   const { 
  //     username,
  //     email,
  //     password,
  //   } = this.state;
  //   const { data } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users`, {
  //     username,
  //     email,
  //     password,
  //   });
  //   const { accessToken } = data;
  //   localStorage.setItem('token', accessToken);
  //   this.props.history.push('/');
  // }

  handleSignupSubmit() {
    const {
      username,
      email,
      password,
    } = this.state;

    this.mutate({
      variables: { username, email, password },
    });

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
            type="text"
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <button
            color="yellow"
            text="Sign Up"
            // onClick={this.handleSignupSubmit}
          />
        </form>
      </div>
    );
  }
}


const ADD_REGISTER_MUTATION = gql`
mutation register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    id
    username
  }
}
`;
const SignupWithMutation = graphql(ADD_REGISTER_MUTATION)(Signup);

export default SignupWithMutation;


// const ADD_REGISTER_MUTATION = gql`
// mutation makeRegister($username: String!, $email: String!, $password: String!) {
//   register(username: $username, email: $email, $password: password) {
//     id
//     username
//   }
// }
// `;
// const SignupWithMutation = graphql(ADD_REGISTER_MUTATION, { name: 'makeRegister' })(Signup);

// export default SignupWithMutation;
