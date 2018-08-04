import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import getWaitingTrips from '../../../../graphql/queries/getWaitingTrips';
import getJoinedTrips from '../../../../graphql/queries/getJoinedTrips';
import getTrip from '../../../../graphql/queries/getTrip';

const style = {
  paddingTop: '20px',
  paddingBottom: '20px',
}

class Accepted extends Component {
  state = { refetched: false }

  handleRefetch() {
    this.props.getTripQuery.refetch();
    this.props.getWaitingTripsQuery.refetch();
    this.props.getJoinedTripsQuery.refetch();
    this.setState({ refetched: true });
  }

  render() {
    const { tripId, senderName, tripTitle } = this.props;
    return this.state.refetched ? (
      <Link 
        style={style} 
        to={`/homepage/joined/tripinfo/${tripId}`}>
        Congrats!, {senderName} has accepted your request for {tripTitle}
      </Link> 
       ) : (
      <Link
        style={style}
        to={`/homepage/joined/tripinfo/${tripId}`}
        onClick={this.handleRefetch.bind(this)}>
        Congrats!, {senderName} has accepted your request for {tripTitle}
      </Link>
    ) 
  }

}

const WrappedAccepted = compose(
  graphql(getTrip, {
    name: 'getTripQuery',
    options: props => ({ variables: { id: props.tripId } }),
  }),
  graphql(getWaitingTrips, {
    name: 'getWaitingTripsQuery',
    options: props => ({ variables: { id: props.userId } }),
  }),
  graphql(getJoinedTrips, {
    name: 'getJoinedTripsQuery',
    options: props => ({ variables: { id: props.userId } }),
  }),
)(Accepted);


export default WrappedAccepted;






