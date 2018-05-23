import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import getWaitingTrips from '../../../../graphql/queries/getWaitingTrips';
import getJoinedTrips from '../../../../graphql/queries/getJoinedTrips';
import getTrip from '../../../../graphql/queries/getTrip';

class Accepted extends Component {
  state = { refetched: false }

  handleRefetch() {
    this.props.getTripQuery.refetch();
    this.props.getWaitingTripsQuery.refetch();
    this.props.getJoinedTripsQuery.refetch();
    this.setState({ refetched: true });
  }

  render() {
    console.log('here is props in Accepted', this.props);
    const { tripId, senderName, tripTitle, userId } = this.props;
    return (
      <div>
        {
          this.state.refetched ?
            <Link to={`/homepage/joined/tripinfo/${tripId}`}>
              Congrats!, {senderName} has accepted your request for {tripTitle}
            </Link> :
            <div>
              <Link
                to={`/homepage/joined/tripinfo/${tripId}`}
                onClick={this.handleRefetch.bind(this)}
              >
                Congrats!, {senderName} has accepted your request for {tripTitle}
              </Link>
            </div>
        }
      </div>
    );
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






// import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
// import getTrip from '../../../../graphql/queries/getTrip';

// class Accepted extends Component {
//   state = { refetched: false }

//   handleRefetch() {
//     this.props.data.refetch();
//     this.setState({ refetched: false });
//   }

//   render() {
//     console.log('here is props in Accepted', this.props);
//     const { tripId, userId, tripTitle } = this.props;
//     return (
//        <div>
//          {
//            this.state.refetched ? 
//             <Link to={`/homepage/joined/tripinfo/${tripId}`}>
//               Congrats!, you have been accepted to {tripTitle} 
//             </Link> :
//             <div>
//               <button onClick={this.handleRefetch.bind(this)}>
//                 Accepted right here
//               </button>
//               <Link 
//                 to={`/homepage/joined/tripinfo/${tripId}`}
//                 onClick={this.handleRefetch.bind(this)}
//               >
//                 Congrats!, you have been accepted to {tripTitle} 
//               </Link> 
//             </div>
//          }
//        </div>  
//     );
//   }
// }

// const WrappedAccepted = graphql(getTrip, {
//   options: props => ({ variables: { id: 92 } }),
// })(Accepted);

// export default WrappedAccepted;
