import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import updateStatus from '../../../../actions/tripStatusAction';

class TripStatus extends React.Component {
  constructor(props) {
    super(props);

    this.updateTripStatus = this.updateTripStatus.bind(this);
    this.renderStatusButton = this.renderStatusButton.bind(this);
  }

  updateTripStatus() {
    let status;
    if (this.props.tripstat === 'open') {
      status = 'close';
      console.log('clicked close');
    } else {
      status = 'open';
      console.log('reopen');
    }
    this.props.mutate({
      variables: { id: this.props.showtrip.id, new_state: status },
    })
      .then(({ data }) => {
        console.log('got data', data);
        this.props.updateStatus(data.updateTripState.trip_status);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  renderStatusButton() {
    let buttonStat;
    if (this.props.tripstat === 'open') {
      buttonStat = (
        <button onClick={this.updateTripStatus}>Close Trip</button>
      );
    } else {
      buttonStat = (
        <button onClick={this.updateTripStatus}>Reopen Trip</button>
      );
    }
    return buttonStat;
  }

  render() {
    return (
      <div>
        {this.renderStatusButton()}
      </div>
    );
  }
}

const mutateStatus = gql`
mutation updateTripState($id: Int!, $new_state: String!) {
    updateTripState(id: $id, new_state:$new_state) {
        id
        title
        trip_status
  }  
}
`;

function mapStateToProps(state) {
  return {
    tripstat: state.tripstat,
    showtrip: state.showtrip,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    updateStatus,
  }, dispatch);
}

const Status = graphql(mutateStatus)(TripStatus);

export default connect(mapStateToProps, matchDispatchToProps)(Status);