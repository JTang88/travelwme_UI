import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import getTrip from '../../../../graphql/queries/getTrip';

const style = {
  paddingTop: '20px',
  paddingBottom: '20px',
}

class Request extends Component {
  state = { refetched: false }

  handleRefetch() {
    this.props.data.refetch();
    this.setState({ refetched: true });
  }

  render() {
    const { tripId, senderName, tripTitle } = this.props;
    return this.state.refetched ? (
      <Link 
        style={style}
        to={`/homepage/joined/tripinfo/${tripId}`}>
        {senderName} wants to join you on {tripTitle}
      </Link> 
    ): (
      <Link
        style={style}
        to={`/homepage/joined/tripinfo/${tripId}`}
        onClick={this.handleRefetch.bind(this)}>
        {senderName} wants to join you on {tripTitle}
      </Link>
    );
  }
}

const WrappedRequest = graphql(getTrip, {
    options: props => ({ variables: { id: props.tripId } }),
  })(Request);

export default WrappedRequest;