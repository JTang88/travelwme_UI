import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import userTrips from '../../../../actions/userTripsAction';
import pendingTrips from '../../../../actions/pendingTripsActions';
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
    user_type
    users{
      id
      username
      user_type
    }
  }
}
}`;


class PendingTrips extends React.Component {
  constructor(props) {
    super(props);
    this.setTripAndTravelers = this.setTripAndTravelers.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.getUser && !prevProps.data.getUser) {
      console.log('QUERY', this.props.data);
      this.props.userTrips(this.props.data.getUser.trips);
      this.props.pendingTrips(this.props.data.getUser.trips);
    }
  }


  setTripAndTravelers(trip) {
    this.props.showTrip(trip);
    this.props.tripCreator(trip.users);
    this.props.tripTravelers(trip.users);
    this.props.tripInterested(trip.users);
  }

  render() {
    return (
      <div>
        <h1>Pending Trips</h1>
        <div>
          {this.props.pendtrips.map(trip =>
            (<div key={trip.id}>
              <h3 onClick={() => this.setTripAndTravelers(trip)}>
                <Link to="/homepage/trips/tripinfo" href="/homepage/trips/tripinfo" className="nav-item nav-link">
                  {trip.title}
                </Link>
              </h3>
            </div>))}
        </div>
        <button onClick={() => console.log(this.props)}>
              button
        </button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    mytrips: state.mytrips,
    pendtrips: state.pendtrips,
    showtrip: state.showtrip,
    userid: state.userid,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    userTrips, pendingTrips, showTrip, userId, tripCreator, tripTravelers, tripInterested,
  }, dispatch);
}

const Pend = graphql(queryTrips, {
  options: props => ({
    variables: {
      id: props.userid,
    },
  }),
})(PendingTrips);

export default connect(mapStateToProps, matchDispatchToProps)(Pend);

