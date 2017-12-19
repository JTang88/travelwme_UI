import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import userTrips from '../../../../actions/userTripsAction';
import showTrip from '../../../../actions/showTripAction';
import userId from '../../../../actions/useridAction';
import tripCreator from '../../../../actions/tripCreatorAction';
import tripTravelers from '../../../../actions/tripTravelersAction';
import tripInterested from '../../../../actions/tripInterestedAction';

const queryTrips = gql`
  query queryTrips($id: Int!) {
    getUser(id: $id) {
    id
    username
    trips {
      id
      title
      date_start
      date_end
      gender
      age
      fitness
      relationship_status
      trip_state
      users{
        id
        username
        user_type
      }
    }
  }
}`;

class MyTrips extends React.Component {
  constructor(props) {
    super(props);
    this.setTripAndTravelers = this.setTripAndTravelers.bind(this);
    this.displayListofTrips = this.displayListofTrips.bind(this);
  }

  componentDidUpdate() {
    console.log('QUERY', this.props.data);
    if (!this.props.data.loading) {
      this.props.userTrips(this.props.data.getUser.trips);
    }
  }

  setTripAndTravelers(trip) {
    this.props.showTrip(trip);
    this.props.tripCreator(trip.users);
    this.props.tripTravelers(trip.users);
    this.props.tripInterested(trip.users);
  }

  displayListofTrips() {
    let tripRender;

    if (!this.props.data.loading) {
      if (this.props.trips.length > 0) {
        tripRender = (<div>
          {this.props.trips.map(trip =>
            (<div key={trip.id}>
              <h3 onClick={() => this.setTripAndTravelers(trip)}>
                <Link to="/homepage/trips/tripgroup" href="/homepage/trips/tripgroup" className="nav-item nav-link">
                  {trip.title}
                </Link>
              </h3>
            </div>))}
        </div>)
      } else {
        tripRender = (<div>
          <h3>Currently No Trips!</h3>
        </div>);
      }
    }

    return tripRender;
  }

  render() {
    return (
      <div>
        <h1>My Trips</h1>
        {this.displayListofTrips()}
        <button onClick={() => console.log(this.props)}>
              button
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    showtrip: state.showtrip,
    userid: state.userid,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    userTrips, showTrip, userId, tripCreator, tripTravelers, tripInterested,
  }, dispatch);
}

const Trips = graphql(queryTrips, {
  options: props => ({
    variables: {
      id: props.userid,
    },
  }),
})(MyTrips);

export default connect(mapStateToProps, matchDispatchToProps)(Trips);
