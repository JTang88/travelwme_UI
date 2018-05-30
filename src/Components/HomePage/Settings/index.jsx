import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import getUserEmail from '../../../graphql/queries/getUserEmail';
import updateUserEmail from '../../../graphql/mutations/updateUserEmail';
import updateUserPassword from '../../../graphql/mutations/updateUserPassword';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordEdit: false,
      emailEdit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  async handleSubmitPassword(e) {
    e.preventDefault();
    await this.props.updateUserPasswordMutation({
      variables: {
        id: this.props.getCurrentUserQuery.getCurrentUser.id,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      },
    });
    this.setState({
      passwordEdit: false,
    });
  }

  async handleSubmitEmail(e) {
    e.preventDefault();
    await this.props.updateUserEmailMutation({
      variables: {
        id: this.props.getCurrentUserQuery.getCurrentUser.id,
        email: this.state.email,
      },
    });
    this.setState({
      emailEdit: false,
    });
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
                  <button onClick={this.handleSubmitEmail}>
                    Submit new email 
                  </button>
                  <button onClick={() => this.setState({ emailEdit: false })}>
                    Cancel 
                  </button>
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
          Password: 
            {
              this.state.passwordEdit ? 
                <div>
                  <div>
                    <input
                      type="text"
                      name="oldPassword"
                      placeholder="Old password"
                      onChange={this.handleChange}
                      className="col-sm-2 offset-sm rounded"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="newPassword"
                      placeholder="New password"
                      onChange={this.handleChange}
                      className="col-sm-2 offset-sm rounded"
                    />
                    <div>
                      <button onClick={this.handleSubmitPassword}>
                        Change Password 
                      </button>
                      <button onClick={() => this.setState({ passwordEdit: false })}>
                        Cancel 
                      </button>
                    </div>
                  </div>
                </div> :
                <div>
                  (Hidden) 
                  <button onClick={() => this.setState({ passwordEdit: true })}>
                    Edit
                  </button>
                </div> 
            }
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
  graphql(updateUserEmail, {
    name: 'updateUserEmailMutation',
  }),
  graphql(updateUserPassword, {
    name: 'updateUserPasswordMutation',
  }),
)(Settings);

export default WrapedSettings;

