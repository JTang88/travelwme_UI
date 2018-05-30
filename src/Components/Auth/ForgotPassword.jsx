import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import forgotPassword from '../../graphql/mutations/forgotPassword';

class ForgotPassword extends Component {
  state = {
    sent: false,
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }
  
  async handleForgotPasswordSubmit(e) {
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

  render() {
    return (
      <div className="loginimg">
        <div className="row justify-content-center align-self-center">
          <div className="login-form-container text-center">
            {
              this.state.sent ?
                (
                  <div>
                    <h1>Your temporary passoword has been sent</h1>
                    <h5>
                      <Link to="/login">
                        <div> Login </div>
                      </Link>
                    </h5>
                  </div>
                ) :
                (
                  <div>
                    <form className="auth-form">
                      <h1>Forgot your password ?</h1>
                      <h5>Enter your email address below, and we'll email you instructions on how to change your password</h5>
                      <input
                        type="text"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange.bind(this)}
                        className="col-sm-2 offset-sm rounded"
                      />
                      <div className="row justify-content-center align-self-center">
                        <button
                          color="white"
                          text="Log In"
                          onClick={this.handleForgotPasswordSubmit.bind(this)}
                          className="btn btn-outline-info col-sm-2 offset-sm"
                        >Submit
                        </button>
                      </div>
                    </form>
                    <h5>
                      <Link to="/login">
                        <div> Login </div>
                      </Link>
                    </h5>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    );
  }
};

const wrappedForgotPassword = graphql(forgotPassword)(ForgotPassword);

export default wrappedForgotPassword;