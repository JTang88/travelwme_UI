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
    // console.log(this.state)
  }

  async handleSignupSubmit(e) {
    e.preventDefault();
    const {
      username,
      email,
      password,
    } = this.state;

    console.log('this is what register look like', this.props.mutate)

    await this.props.mutate({
      variables: {
        username,
        email,
        password,
      },
    });
  }

  render() {
    return (
      <div className="signup-form-container">
        <form 
          className="auth-form"
          // onSubmit={this.handleSignupSubmit}
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
            onClick={this.handleSignupSubmit}
          />
        </form>
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


// const CREATE_REGISTER_MUTATION = gql`
// mutation register($username: String!, $email: String!, $password: String!) {
//   Signup(username: $username, email: $email, password: $password) {
//     id
//     username
//   }
// }
// `;

// export default graphql(CREATE_REGISTER_MUTATION, { name: 'register' })(Signup)

// Signup = graphql(queryTrips)(Signup);

// export default Signup;


// const ADD_REGISTER_MUTATION = gql`
// mutation register($username: String!, $email: String!, $password: String!) {
//   register(username: $username, email: $email, password: $password) {
//     id
//     username
//   }
// }
// `;
// const SignupWithMutation = graphql(ADD_REGISTER_MUTATION)(Signup);

// export default SignupWithMutation;