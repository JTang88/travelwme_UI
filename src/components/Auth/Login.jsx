import React, { Component } from 'react';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentUser } from '../../actions/authActions';
import login from '../../mutations/login';

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

    const token = await this.props.mutate({
      variables: {
        email,
        password,
      },
    });

    if (token) {
      localStorage.setItem('token', token.data.login);
      const decodedToken = decode(token.data.login);
      this.props.setCurrentUser(decodedToken.user);
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
              >Login</button>
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


const loginWithMutation = graphql(login)(Login);

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setCurrentUser }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(loginWithMutation);

