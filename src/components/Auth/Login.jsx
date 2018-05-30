import React, { Component } from 'react';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import login from '../../graphql/mutations/login';
import { updateCurrentUser } from '../../graphql/mutations/updateCurrentUser';
import forgotPassword from '../../graphql/mutations/forgotPassword';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      sent: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleForgotPasswordSubmit = this.handleForgotPasswordSubmit.bind(this);
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
    
    const token = await this.props.loginMutation({
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

  async handleForgotPasswordSubmit(e) {
    e.preventDefault();
    await this.props.forgotPasswordMutation({
      variables: {
        email: this.state.email,
      },
    });
    this.setState({
      sent: true,
    });
  }

  render() {
    return this.props.match.path === '/login' ?
      (
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
      ) : 
      ( 
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
                    <form 
                      className="auth-form"
                      onSubmit={this.handleLoginSubmit}
                    >
                      <h1>Forgot your password ?</h1>
                      <h5>Enter your email address below, and we'll email you instructions on how to change your password</h5>
                      <input
                        type="text"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                        className="col-sm-2 offset-sm rounded"
                      />
                      <div className="row justify-content-center align-self-center">
                        <button
                          color="white"
                          text="Log In"
                          onClick={this.handleForgotPasswordSubmit}
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
}


const WrapedLogin = compose(
  graphql(login, { name: 'loginMutation' }),
  graphql(updateCurrentUser, { name: 'updateCurrentUserMutation' }),
  graphql(forgotPassword, { name: 'forgotPasswordMutation' }),
)(Login);


export default WrapedLogin;
