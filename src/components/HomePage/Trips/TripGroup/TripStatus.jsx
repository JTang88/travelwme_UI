import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import updateStatus from '../../../../actions/tripStatusAction';
import singleStatus from '../../../../actions/singleStatusAction';

const mutateStatus = gql`
mutation updateTripState($id: Int!, $new_state: String!) {
    updateTripState(id: $id, new_state:$new_state) {
        id
        title
        trip_status
  }  
}
`;

class TripStatus extends React.Component {
  constructor(props) {
    super(props);

    this.updateTripStatus = this.updateTripStatus.bind(this);
    this.renderStatusButton = this.renderStatusButton.bind(this);
  }

  updateTripStatus() {
    let statusup = {};
    let status;
    for (let i = 0; i < this.props.mytrips.length; i++) {
      if (this.props.mytrips[i].id === this.props.showtrip.id) {
        if (this.props.mytrips[i].trip_status === 'open') {
          status = 'close';
        } else {
          status = 'open';
        } 
      }
    }

    this.props.mutate({
      variables: { id: this.props.showtrip.id, new_state: status },
    })
      .then(({ data }) => {
        console.log('got data', data);
        statusup = {
          trips: this.props.mytrips,
          id: this.props.showtrip.id,
          status: data.updateTripState.trip_status,
        };
        this.props.updateStatus(statusup);
        this.props.singleStatus(data.updateTripState.trip_status);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  renderStatusButton() {
    let buttonStat;
    for (let i = 0; i < this.props.mytrips.length; i++) {
      if (this.props.mytrips[i].id === this.props.showtrip.id) {
        if (this.props.mytrips[i].trip_status === 'open') {
          buttonStat = (
            <button onClick={this.updateTripStatus}>Close Trip</button>
          );
        } else {
          buttonStat = (
            <button onClick={this.updateTripStatus}>Reopen Trip</button>
          );
        } 
      }
    }
    return buttonStat;
  }

  render() {
    return (
      <div>
        {this.props.showtrip.user_type === 'C' ? this.renderStatusButton() : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    tripstat: state.tripstat,
    showtrip: state.showtrip,
    mytrips: state.mytrips,
    singlestat: state.singlestat,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    updateStatus, singleStatus,
  }, dispatch);
}

const Status = graphql(mutateStatus)(TripStatus);

export default connect(mapStateToProps, matchDispatchToProps)(Status);