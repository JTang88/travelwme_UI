import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Typography, Button, TextField, withStyles } from '@material-ui/core';
import updateTripDescription from '../../../graphql/mutations/updateTripDescription'; 
import './index.css';

const styles = {
  textField: {
    backgroundColor: 'white',
  },
  cancelButton: {
    marginLeft: 5,
  }
}

class Description extends Component {
  state = {
    edit: false,
    description: this.props.description
  }
  
  handleInputChange = (event) => {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleToggleEdit = (e) => {
    e.preventDefault();
    this.setState({
      edit: !this.state.edit,
    });
  }

  handleSubmitDescription = (e) => {
    e.preventDefault();
    this.setState({
      edit: false,
    });
    this.props.mutate({
      variables: {
        id: this.props.tripId,
        description: this.state.description,
      },
    });
  }

  render() {
    const { classes: { cancelButton, textField } } = this.props;
    return (
      <div className="details-container">
        <Typography
          variant="title"
          color="inherit"
          gutterBottom
        >
          Details
      </Typography>
      {
        this.state.edit === false ?
          <div>
            <div className="description-area">
              <Typography
                variant="body1"
                color="inherit"
              >
                {this.props.description}
              </Typography>
            </div>
            {
              this.props.currentUserType === 'C' ? 
              <Button variant="outlined" color="primary" size="small" onClick={this.handleToggleEdit}>
                  Edit Trip Description
              </Button> : null
            }
          </div> :
          <div>
            <div className="description-area">
              <TextField
                className={textField}
                value={this.state.description}	
                id="tripDetails"
                type="text"
                lable="Trip Details"
                rows={19}
                multiline
                fullWidth
                name="description"
                onChange={this.handleInputChange}
              />
            </div>
            <Button variant="outlined" color="primary" size="small" onClick={this.handleSubmitDescription}>
              Submit Description
            </Button>
            <Button className={cancelButton} variant="outlined" color="primary" size="small" onClick={this.handleToggleEdit}>
              Cancel
            </Button>
          </div> 
        }
      </div>
    );
  }
}

const WrappedDescription = graphql(updateTripDescription)(withStyles(styles)(Description))

export default WrappedDescription;