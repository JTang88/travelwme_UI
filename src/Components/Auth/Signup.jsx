import React, { Component } from 'react';
import { 
  Typography, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  withStyles 
} from '@material-ui/core';
import { graphql } from 'react-apollo';
import Login from './Login';
import register from '../../graphql/mutations/register';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class Signup extends Component {
  state = {
    backToLogin: false,
    email: '',
    username: '',
    password: '',      
    gender: '',
    relationship: ''
  };
  

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value }, console.log(this.state));
  }

  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   }, console.log('here is state in Signup', this.state));
  // };

  backToLogin = (e) => {
    e.preventDefault();
    this.setState({
      backToLogin: true,
    })
  }

  handleSignupSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      email,   
      password,
      birthday,
      gender,
      relationship,
    } = this.state;

    console.log('in sign up')
    if (username === '' || email === '' || password === '') {
      return;
    }

    console.log('pass return')
    await this.props.mutate({
      variables: {
        username,
        email,
        password,
        birthday,
        gender,
        relationship,
      },
    });
    this.setState({
      backToLogin: true,
    })
  }

  render() {
    const { classes } = this.props;
    if (this.state.backToLogin) {
      return <Login />
    }
    return (
      <div>
        <Typography 
          variant="display3" 
          gutterBottom 
          color="primary" 
        >
          Sign up
        </Typography>
        <TextField
          autoFocus
          required
          margin="normal"
          id="username"
          label="Username"
          type="text"
          name="username"
          onChange={this.handleChange}
        />
        <TextField
          margin="normal"
          required
          id="email"
          label="Email"
          type="text"
          name="email"
          onChange={this.handleChange}
        />
        <TextField
          margin="normal"
          required
          id="password"
          label="Password"
          type="password"
          name="password"
          onChange={this.handleChange}
        />
        <TextField
          margin="normal"
          required
          name = "birthday"
          id="birthday"
          label="Birthday"
          type="date"
          name="birthday"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleChange}
        />
        <div>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              value={this.state.gender}
              onChange={this.handleChange}
              inputProps={{
                name: 'gender',
                id: 'gender',
              }}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="relationship-container">
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="relationship">Relationship</InputLabel>
            <Select
              value={this.state.relationship}
              onChange={this.handleChange}
              inputProps={{
                name: 'relationship',
                id: 'relationship',
              }}
            >
              <MenuItem value={'single'}>Single</MenuItem>
              <MenuItem value={'in a relationship'}>In a relationship</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSignupSubmit}
        >Sign up
        </Button>
      </div>
    );
  }
}

const styledSignUp = withStyles(styles)(Signup);

const styledSignUpWithMutation = graphql(register)(styledSignUp);

export default styledSignUpWithMutation;
