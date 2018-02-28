import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, withApollo, compose } from 'react-apollo';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { setCurrentUser } from '../../../actions/authActions';
// import setTrendTrips from '../../../actions/trendTripAction';
// import showTrip from '../../../actions/showTripAction';
// import tripCreator from '../../../actions/tripCreatorAction';
// import tripTravelers from '../../../actions/tripTravelersAction';
// import tripInterested from '../../../actions/tripInterestedAction';
// import updateStatus from '../../../actions/tripStatusAction';
import showTrendTrips from '../../../graphql/queries/showTrendTrips';


class TrendTrips extends React.Component { 
  constructor(props) {
    super(props);
  }

  setTripAndTravelers(trip) {
    console.log('trippppppp clicked', trip);
    this.props.showTrip(trip);
    this.props.tripCreator(trip.members);
    this.props.tripTravelers(trip.members);
    this.props.tripInterested(trip.members);
    this.props.updateStatus(trip.trip_status);
  }

  render() {
    console.log(this.props.client);

    // console.log(this.props.client.readQuery({
    //   query: gql`
    //   query ReadTodo {
    //     todo(id: 5) {
    //       id
    //       text
    //       completed
    //     }
    //   }
    // `,
    // }));
    return (
      <div>
        <h1>Trending Trips</h1>
        { this.props.data.loading ? '' : 
          this.props.data.showTrendTrips.map((trip, i) => (
            <div key={i} >
              <div onClick={() => this.setTripAndTravelers(trip)}>
                <Link to="homepage/trips/tripinfo" href="homepage/trips/tripinfo">
                  <h3>{trip.title}</h3>
                  <div>
                    <ul>
                      <li>From: {trip.date_start}</li>
                      <li>To: {trip.date_end}</li>
                      <li>Cost {trip.cost}</li>
                    </ul>
                  </div>
                </Link>
              </div>
            </div>  
            ))
        } 
      </div>
    );
  }
}

const TrendTripWithQuery = graphql(showTrendTrips, {
  options: props => ({ variables: { id: 1 } }),
})(TrendTrips);

const TrendTripWithClient = withApollo(TrendTripWithQuery);

export default TrendTripWithClient;


// client.readQuery({
//   query: gql`
//     query ReadTodo {
//       todo(id: 5) {
//         id
//         text
//         completed
//       }
//     }
//   `,
// });








// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//     trend: state.trend,
//   };
// }

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({
//     setCurrentUser, setTrendTrips, showTrip, tripCreator, tripTravelers, tripInterested, updateStatus,
//   }, dispatch);
// }

// const TrendTripWithQuery = graphql(showTrendTrips, {
//   options: props => ({ variables: { id: props.auth.user.id } }),
// })(TrendTrips);

// export default connect(mapStateToProps, matchDispatchToProps)(TrendTripWithQuery);


// const Container = compose(
//   graphql(
//     getUser, 
//     { 
//       name: 'qlUser',
//       options: (props) => {
//         return {
//           variables: {
//             id: props.auth.user.id,
//           },
//         };
//       },
//     },
//   ),
//   graphql(
//     showTrendTrips, 
//     { 
//       name: 'qlTrips', 
//       options: (props) => {
//         return {
//           variables: {
//             id: props.auth.user.id,
//           },
//         };
//       },
//     },
//   ),
// )(TrendTrips);

// export default connect(mapStateToProps, matchDispatchToProps)(Container);

