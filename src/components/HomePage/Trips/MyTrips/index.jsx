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
    this.tripRender = this.tripRender.bind(this);
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
  }

  tripRender() {

    let tripsRender;
    
    if (this.props.trips.length > 0) {
      return (<div>
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
      return (<div>
        <h3>Currently No Trips!</h3>
      </div>);
    } 

  }
  
  render() {

    return (
      <div>
        <h1>My Trips</h1>
        {this.tripRender()}
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
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ userTrips, showTrip, userId, tripCreator }, dispatch);
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
