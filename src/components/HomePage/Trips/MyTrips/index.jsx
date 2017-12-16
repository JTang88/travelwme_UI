import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import userTrips from '../../../../actions/userTripsAction';
import myTrip from '../../../../actions/myTripAction';
import userId from '../../../../actions/useridAction';
import tripTravelers from '../../../../actions/tripTravelersAction';

// Suppose our profile query took an avatar size
// const CurrentUserForLayout = gql`
// query CurrentUserForLayout($avatarSize: Int!) {
//   currentUser {
//     login
//     avatar_url(avatarSize: $avatarSize)
//   }
// }
// `;

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
  }

  componentDidUpdate() {
    console.log('QUERY', this.props.data);
    // if (!this.props.data.loading) {
    //   this.props.userTrips(this.props.data.getUser.trips);
    // }
    if (!this.props.data.loading) {
      this.props.userTrips(this.props.data.getUser.trips);
    }
  }

  setTripAndTravelers(trip) {
    this.props.myTrip(trip);
    this.props.tripTravelers(trip.users);
  }

  render() {
    // console.log('MYTRIPSSSSS', this.props.history.push({
    //   pathName:
    //   state: {
        
    //   }
    // }));

    return (
      <div>
        <h1>My Trips</h1>
        <div>
          {this.props.trips.map(trip =>
            (<div key={trip.id}>
              <h3 onClick={() => this.setTripAndTravelers(trip)}>
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
    userid: state.userid,
    travelers: state.travelers,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ userTrips, myTrip, userId, tripTravelers }, dispatch);
}

// / The caller could do something like:
// <ProfileWithData avatarSize={300} />
// And our HOC could look like:
// const ProfileWithData = graphql(CurrentUserForLayout, {
//   options: ({ avatarSize }) => ({ variables: { avatarSize } }),
// })(Profile);
// const ProfileWithData = graphql(CurrentUserForLayout, {
//   options: { variables: { avatarSize: 100 } },
//   })(Profile);

MyTrips = graphql(queryTrips, {
  options: props => ({
    variables: {
      id: props.userid,
    },
  }),
})(MyTrips);


// MyTrips=  graphql(queryTrips, {
//   options: { variables: { id: 2 } },
// })(MyTrips);


export default connect(mapStateToProps, matchDispatchToProps)(MyTrips);
