import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Grid } from '@material-ui/core';
import Creator from './Creator';
import TripUsers from './TripUsers';
import Description from './Description';
import TripInfoHeader from './TripInfoHeader';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import makeTravelerObjByTypes from '../../../services/makeTravelerObjByTypes';
import Comment from './Comment';
import AddComment from './Comment/AddComment';
import getTrip from '../../../graphql/queries/getTrip';

class TripInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelers: undefined,
    };
  }

  componentWillMount() {
    if (!this.props.getTripQuery.loading) {
      this.setState({
        travelers: makeTravelerObjByTypes(
          this.props.getTripQuery.getTrip.members, 
          this.props.getCurrentUserQuery.getCurrentUser.id, 
          this.props.getTripQuery.getTrip.creator.id, 
        ),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getTripQuery !== this.props.getTripQuery) {
      this.setState({
        travelers: makeTravelerObjByTypes(
          this.props.getTripQuery.getTrip.members, 
          this.props.getCurrentUserQuery.getCurrentUser.id, 
          this.props.getTripQuery.getTrip.creator.id, 
        ),
      });
    }
  }

  render() {
    if (this.state.travelers) {
      const { getTrip: trip } = this.props.getTripQuery;
      const { currentMember, currentUserType, joiners, interesters } = this.state.travelers;
      const { getCurrentUser: user } = this.props.getCurrentUserQuery;
      const { tripType, id: tripId } = this.props.match.params;
      return (  
        <div>
          <TripInfoHeader 
            trip={trip}
            currentUserType={currentUserType}
            user={user}
            currentMember={currentMember}
            tripType={tripType}
          />
          <div className="creator-details-container">
            <Grid container>
              <Grid item md={8}>
                <Description
                  currentUserType={currentUserType}
                  tripId={Number(tripId)}
                  description={trip.description}
                />
              </Grid>
              <Grid item md={4}>
                <Creator
                  trip={trip}
                  currentUserType={currentUserType}
                />
              </Grid>
            </Grid>
          </div >
          <TripUsers
            trip={trip}
            tripId={Number(tripId)}
            interesters={interesters}
            joiners={joiners}
            currentUserType={currentUserType}
          />
          <Comment
            tripId={Number(tripId)}
            username={user.username}
            tripCommentId={trip.tripCommentId}
          />
          <AddComment
            username={user.username}
            tripCommentId={trip.tripCommentId}
          />
        </div> 
      );
    } 
    return null;
  }
}


const WrapedTripInfo = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getTrip, {
    name: 'getTripQuery',
    options: props => (
      { variables: { id: Number(props.match.params.id) } }
    ), 
  }),
)(TripInfo);

export default WrapedTripInfo;

