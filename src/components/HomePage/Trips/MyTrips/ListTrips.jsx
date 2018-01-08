import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import userTrips from '../../../../actions/userTripsAction';
import pendingTrips from '../../../../actions/pendingTripsActions';
import showTrip from '../../../../actions/showTripAction';
import tripCreator from '../../../../actions/tripCreatorAction';
import tripTravelers from '../../../../actions/tripTravelersAction';
import tripInterested from '../../../../actions/tripInterestedAction';
import updateStatus from '../../../../actions/tripStatusAction';


class ListTrips extends React.Component {
  constructor(props) {
    super(props);
    this.setTripAndTravelers = this.setTripAndTravelers.bind(this);
  }

  setTripAndTravelers(trip) {
    this.props.showTrip(trip);
    this.props.tripCreator(trip.members);
    this.props.tripTravelers(trip.members);
    this.props.tripInterested(trip.members);
    // this.props.updateStatus(trip.trip_status);
  }
  
  render() {
    return (
      <div>
        <div>
          {this.props.mytrips.map(trip =>
            (<div key={trip.id}>
              <h3 onClick={() => this.setTripAndTravelers(trip)}>
                <Link to="/homepage/trips/tripgroup" href="/homepage/trips/tripgroup" className="nav-item nav-link">
                  {trip.title}
                </Link>
                  {trip.state}
              </h3>
            </div>))}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    mytrips: state.mytrips,
    pendtrips: state.pendtrips,
    showtrip: state.showtrip,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
    tripstat: state.tripstat,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    userTrips, pendingTrips, showTrip, tripCreator, tripTravelers, tripInterested, updateStatus,
  }, dispatch);
}



export default connect(mapStateToProps, matchDispatchToProps)(ListTrips);
