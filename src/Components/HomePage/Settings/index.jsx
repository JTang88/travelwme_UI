import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import decode from 'jwt-decode';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import getUserEmail from '../../../graphql/queries/getUserEmail';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordEdit: false,
      emailEdit: false,
    };
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }
 
  render() {
    return this.props.getUserEmailQuery.loading ? 'loading' : 
      (   
        <div>
          <h3>Account</h3>
            <div>
              email: 
              { 
                this.state.emailEdit ? 
                <div>
                  <input
                    type="text"
                    name="email"
                    placeholder="New email"
                    onChange={this.handleChange}
                    className="col-sm-2 offset-sm rounded"
                  />
                </div> :
                <div>
                  {this.props.getUserEmailQuery.getUser.email}
                  <button onClick={() => this.setState({ emailEdit: true })}>
                    Edit 
                  </button>
                </div>
              }
            </div>
            <div>
              Password: (Hidden)
              <button onClick={() => this.setState({ passwordEdit: true })}>
                Edit
              </button>
            </div>
        </div>
      );
  }
}

const WrapedSettings = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getUserEmail, {
    name: 'getUserEmailQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(Settings);

export default WrapedSettings;

