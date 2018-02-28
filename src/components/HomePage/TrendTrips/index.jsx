import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, withApollo, compose } from 'react-apollo';
import showTrendTrips from '../../../graphql/queries/showTrendTrips';
import getCurrentUser from '../../../graphql/queries/getCurrentUser';


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
    console.log('this.props is:', this.props);
    return (
      <div>
        <h1>Trending Trips</h1>
        { 
          this.props.showTrendTripsQuery.loading ? '' : 
          this.props.showTrendTripsQuery.showTrendTrips.map((trip, i) => (
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

const TrendTripWithQuery = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(showTrendTrips, {
    name: 'showTrendTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(TrendTrips);

const TrendTripWithClient = withApollo(TrendTripWithQuery);

export default TrendTripWithClient;

