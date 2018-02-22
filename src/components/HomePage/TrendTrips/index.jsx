import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentUser } from '../../../actions/authActions';
import setTrendTrips from '../../../actions/trendTripAction';
import showTrip from '../../../actions/showTripAction';
import tripCreator from '../../../actions/tripCreatorAction';
import tripTravelers from '../../../actions/tripTravelersAction';
import tripInterested from '../../../actions/tripInterestedAction';
import updateStatus from '../../../actions/tripStatusAction';

const getUser = gql`
query getUser($id: Int!) {
  getUser(id: $id) {
    id
    username
    age
    gender
    body_type
    relationship
    description
    publicId
  }
}`;


const showTrendTrips = gql`
query showTrendTrips($id: Int!) {
  showTrendTrips(id: $id) {
    id
    title
    description
    date_start
    date_end
    gender
    age_start
    age_end
    relationship
    cost
    trip_keywords
    body_types
    trip_status
    publicId
    user_type
    members {
      tripId
      user_type
      user {
        id
        username
        age
        gender
        relationship
        body_type
        description
        publicId
        email
      }  
    }
  }
}`;


class TrendTrips extends React.Component { 
  constructor(props) {
    super(props);
  }


  componentDidUpdate(prevProps) {
    if (this.props.qlUser.getUser && !prevProps.qlUser.getUser) {
      this.props.setCurrentUser(this.props.qlUser.getUser);
    }

    if (this.props.qlTrips.showTrendTrips && !prevProps.qlTrips.showTrendTrips) {
      this.props.setTrendTrips(this.props.qlTrips.showTrendTrips);
    }
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
    return (
      <div>
        <h1>Trending Trips</h1>
        { this.props.qlTrips.showTrendTrips ? 
          this.props.qlTrips.showTrendTrips.map((trip, i) => (
            <div key={i} >
              <h3 onClick={() => this.setTripAndTravelers(trip)}>
                <Link to="homepage/trips/tripinfo" href="homepage/trips/tripinfo">{trip.title}</Link>
              </h3>
            </div>  
            )
          ) : ''
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    trend: state.trend,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentUser, setTrendTrips, showTrip, tripCreator, tripTravelers, tripInterested, updateStatus,
  }, dispatch);
}

const Container = compose(
  graphql(
    getUser, 
    { 
      name: 'qlUser',
      options: (props) => {
        return {
          variables: {
            id: props.auth.user.id,
          },
        };
      },
    },
  ),
  graphql(
    showTrendTrips, 
    { 
      name: 'qlTrips', 
      options: (props) => {
        return {
          variables: {
            id: props.auth.user.id,
          },
        };
      },
    },
  ),
)(TrendTrips);

export default connect(mapStateToProps, matchDispatchToProps)(Container);


