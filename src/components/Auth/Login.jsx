import React, { Component } from 'react';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentUser } from '../../actions/authActions';

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

  // componentDidMount() {
  //   console.log(this.props);
  // }

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
      this.props.history.push('/');
    }
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
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <input
            type="test"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <button
            color="white"
            text="Log In"
            onClick={this.handleLoginSubmit}
          />
        </form>
      </div>
    );
  }
}


const login = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) 
}
`;

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

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
//   }

//   handleChange(event) {
//     const { name } = event.target;
//     this.setState({ [name]: event.target.value });
//   }

//   async handleLoginSubmit(e) {
//     e.preventDefault();
//     const {
//       email,
//       password,
//     } = this.state;

//     if (email === '' || password === '') {
//       return;
//     }

//     const token = await this.props.mutate({
//       variables: {
//         email,
//         password,
//       },
//     });

//     localStorage.setItem('token', token.data.login);
//     console.log(token.data.login);
//     this.props.history.push('/');
//   }

//   render() {
//     return (
//       <div className="login-form-container">
//         <form 
//           className="auth-form"
//           onSubmit={this.handleLoginSubmit}
//         >
//           <h2>Login</h2>
//           <p>
//             Don't have an account?
//             <span className="auth-link">
//               <Link to="/sign">
//                 Sign up
//               </Link>
//             </span>
//           </p>
//           <input
//             type="text"
//             name="email"
//             placeholder="email"
//             onChange={this.handleChange}
//           />
//           <input
//             type="test"
//             name="password"
//             placeholder="password"
//             onChange={this.handleChange}
//           />
//           <button
//             color="white"
//             text="Log In"
//             onClick={this.handleLoginSubmit}
//           />
//         </form>
//       </div>
//     );
//   }
// }


// const login = gql`
// mutation login($email: String!, $password: String!) {
//   login(email: $email, password: $password) 
// }
// `;

// const loginWithMutation = graphql(login)(Login);

// export default loginWithMutation;

