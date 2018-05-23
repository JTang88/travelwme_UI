import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import getTrip from '../../../../graphql/queries/getTrip';

class Request extends Component {
  state = { refetched: false }

  handleRefetch() {
    this.props.data.refetch();
    this.setState({ refetched: true });
  }

  render() {
    console.log('here is props in Request', this.props);
    const { tripId, senderName, tripTitle, userId } = this.props;
    return (
      <div>
        {
          this.state.refetched ?
            <Link to={`/homepage/joined/tripinfo/${tripId}`}>
              {senderName} wants to join you on {tripTitle}
            </Link> :
            <div>
              <Link
                to={`/homepage/joined/tripinfo/${tripId}`}
                onClick={this.handleRefetch.bind(this)}
              >
                {senderName} wants to join you on {tripTitle}
              </Link>
            </div>
        }
      </div>
    );
  }
}

const WrappedRequest = graphql(getTrip, {
    options: props => ({ variables: { id: props.tripId } }),
  })(Request);

export default WrappedRequest;