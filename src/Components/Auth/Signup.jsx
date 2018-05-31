import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import register from '../../graphql/mutations/register';
import Select from '../Global/Forms/Select';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      body_typeOptions: ['average', 'atheltic', 'sexy', 'well-rounded'],
      relationshipOptions: ['single', 'in a relationship', 'complicated'],
      ageOptions:
       [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
         40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 
         62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 
         84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
      genderOptions: ['male', 'female', 'other'],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  handleInputChange(event) {
    const change = {};
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    change[event.target.name] = value;
    this.setState(change);   
  }

  async handleSignupSubmit(e) {
    e.preventDefault();
    const {
      username,
      email,
      password,
      age,
      gender,
      relationship,
      body_type,
    } = this.state;

    if (username === '' || email === '' || password === '') {
      return;
    }

    await this.props.mutate({
      variables: {
        username,
        email,
        password,
        age,
        gender,
        relationship,
        body_type,
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
          <div className="row justify-content-center align-self-center">
            <Select
              title="Age"
              name="age"
              placeholder="select your age"
              handleFunc={this.handleInputChange}
              options={this.state.ageOptions}
              selectedOption={this.state.age}
            />
          </div>
          <div className="row justify-content-center align-self-center">
            <Select
              title="Gender"
              name="gender"
              placeholder="select your gender"
              handleFunc={this.handleInputChange}
              options={this.state.genderOptions}
              selectedOption={this.state.gender}
            />
          </div>
          <div className="row justify-content-center align-self-center">
            <Select
              title="Relationship"
              name="relationship"
              placeholder="choose a answer"
              handleFunc={this.handleInputChange}
              options={this.state.relationshipOptions}
              selectedOption={this.state.relationship}
            />
          </div>
          <div className="row justify-content-center align-self-center">
            <Select
              title="Body_type"
              name="body_type"
              placeholder="choose a answer"
              handleFunc={this.handleInputChange}
              options={this.state.body_typeOptions}
              selectedOption={this.state.body_type}
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

const SignupWithMutation = graphql(register)(Signup);

export default SignupWithMutation;
