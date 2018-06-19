import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Typography } from '@material-ui/core';
import updateTripDescription from '../../../graphql/mutations/updateTripDescription'; 
import TextArea from '../../Global/Forms/TextArea';
import './index.css';

class Description extends Component {
  state = {
    edit: false,
    description: this.props.description
  }
  
  handleInputChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleEditThisTrip(e) {
    e.preventDefault();
    this.setState({
      edit: true,
    });
  }

  handleSubmitDescription(e) {
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
    return (
      <div>
        {
          this.state.edit === false ?
            <div className="details-container">
              <Typography
                variant="title"
                color="inherit"
                gutterBottom
              >
                Details
              </Typography>
              <Typography
                variant="body1"
                color="inherit"
              >
                {this.props.description}
              </Typography>
              {
                this.props.currentUserType === 'C' ? 
                <button onClick={this.handleEditThisTrip.bind(this)}>
                    Edit Trip Description
                </button> : null
              }
            </div> :
            <div>
              <TextArea
                type="text"
                title="Trip Description"

                rows={6}
                name="description"
                content={this.state.description}
                handleFunc={this.handleInputChange.bind(this)}
              />
              <button onClick={this.handleSubmitDescription.bind(this)}>
                Submit Description
            </button>
            </div> 
        }
      </div>
    );
  }
}

const WrappedDescription = graphql(updateTripDescription)(Description)

export default WrappedDescription;