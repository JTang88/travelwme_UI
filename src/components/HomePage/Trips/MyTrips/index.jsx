import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import userTrips from '../../../../actions/userTripsAction';
import myTrip from '../../../../actions/myTripAction';

const queryTrips = gql`{
  getUser(id: 1) {
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
    }
  }
}
`;

class MyTrips extends React.Component {
  componentDidUpdate() {
    console.log('QUERY', this.props.data)
    if (!this.props.data.loading) {
      this.props.userTrips(this.props.data.getUser.trips);
    }
  }

  render() {
    console.log('MYTRIPSSSSS', this.props.trips);
    return (
      <div>
        <h1>My Trips</h1>
        <div>
          {this.props.trips.map(trip =>
            (<div key={trip.id}>
              <h3 onClick={() => this.props.myTrip(trip)}>
                <Link to="/homepage/trips/tripgroup" href="/homepage/trips/tripgroup" className="nav-item nav-link">
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
    trips: state.trips,
    mytrip: state.mytrip,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ userTrips: userTrips, myTrip: myTrip }, dispatch);
}

MyTrips = graphql(queryTrips)(MyTrips);

export default connect(mapStateToProps, matchDispatchToProps)(MyTrips);
