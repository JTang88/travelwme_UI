import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Typography, Switch, Button, TextField, withStyles } from '@material-ui/core';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import getUserEmail from '../../../graphql/queries/getUserEmail';
import updateUserEmail from '../../../graphql/mutations/updateUserEmail';
import updateUserPassword from '../../../graphql/mutations/updateUserPassword';
import GeneralHeader from '../GeneralHeader';
import './index.css';

const styles = {
  typo: {
    display: 'inline-block',
    marginTop: 15,
  },
  switch: {
    position: 'absolute',
    top: 0,
    right: '35%',
  },
}

class Settings extends Component {
  state = {
    passwordEdit: false,
    emailEdit: false,
    checkedA: false,
    checkedB: false,
  };

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  handleChangeCheck = name => event => {
    if (name === 'checkedA') {
      this.setState({ 
        [name]: event.target.checked,
        emailEdit: !this.state.emailEdit,
      });
    } else if (name === 'checkedB') {
      this.setState({
        [name]: event.target.checked,
        passwordEdit: !this.state.passwordEdit,
      });
    }
  };

  handleSubmitPassword = async (e) => {
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

  handleSubmitEmail = async (e) => {
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
    const { classes } = this.props;
    return this.props.getUserEmailQuery.loading ? 'loading' : 
      (   
        <div>
          <GeneralHeader>
            Settings
          </GeneralHeader>
          <div className="settings-container">
            <Typography variant="title" color="inherit" gutterBottom>Account</Typography>
              <div className="email-container">
                { 
                  this.state.emailEdit ? 
                  <div className="setting-form-container">
                    <TextField
                      autoFocus
                      margin="normal"
                      id="email"
                      label="Email"
                      type="text"
                      name="email"
                      onChange={this.handleChange}
                    />
                    <div>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        color="inherit" 
                        onClick={this.handleSubmitEmail}
                      >
                        Submit
                      </Button>
                    </div>
                  </div> :
                  <div className="setting-container">
                    <Typography className={classes.typo} variant="body2">
                      Email: &nbsp;
                    </Typography>
                    <Typography className={classes.typo} variant="body1">
                      {this.props.getUserEmailQuery.getUser.email}
                    </Typography>
                  </div>
                }
                <Switch
                  className={classes.switch}
                  checked={this.state.checkedA}
                  onChange={this.handleChangeCheck('checkedA')}
                  value="checkedA"
                />
              </div>
            <div>
              {
                <div className="password-container">
                  {
                    this.state.passwordEdit ?
                      <div className="setting-form-container">
                        <div>
                          <TextField
                            autoFocus
                            margin="normal"
                            id="oldpassword"
                            label="Old Password"
                            type="password"
                            name="oldPassword"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div>
                          <TextField
                            autoFocus
                            margin="normal"
                            id="password"
                            label="Password"
                            type="password"
                            name="newPassword"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div>
                          <Button
                            variant="outlined"
                            size="small"
                            color="inherit"
                            onClick={this.handleSubmitPassword}
                          >
                            Submit
                          </Button>
                        </div>
                      </div> :
                      <div className="setting-container">
                        <Typography className={classes.typo} variant="body2">
                          Password: &nbsp;
                        </Typography>
                        <Typography className={classes.typo} variant="body1">
                          (Hidden)
                        </Typography>
                      </div>
                  }
                  <Switch
                    className={classes.switch}
                    checked={this.state.checkedB}
                    onChange={this.handleChangeCheck('checkedB')}
                    value="checkedB"
                  />
                </div>
              }
            </div>
          </div>
        </div>
      );
  }
}

const WrapedSettings = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
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
)(withStyles(styles)(Settings));

export default WrapedSettings;

