import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUser';
import makeTravelerObjByTypes from '../../../../../services/makeTravelerObjByTypes';
import Comment from './Comment';
import AddComment from './Comment/AddComment';
import getTrip from '../../../../../graphql/queries/getTrip';

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
    console.log('this is state.travelers in tripInfo: ', this.props)
    return (
      <div>
        { this.state.travelers ? 
          <div>
            <TripDetails 
              tripId={Number(this.props.match.params.id)}
              trip={this.props.getTripQuery.getTrip}
              currentUser={this.state.travelers.currentUser}
              userId={this.props.getCurrentUserQuery.getCurrentUser.id}
              username={this.props.getCurrentUserQuery.getCurrentUser.username}
              currentMember={this.state.travelers.currentMember}
              currentMemberId={this.state.travelers.currentMemberId}
              tripType={this.props.match.params.tripType}
            /> 
            <TripUsers 
              trip={this.props.getTripQuery.getTrip}
              tripId={Number(this.props.match.params.id)}
              interesters={this.state.travelers.interesters}
              joiners={this.state.travelers.joiners} 
              currentUser={this.state.travelers.currentUser}
            /> 
            <Comment 
              tripId={Number(this.props.match.params.id)}
              username={this.props.getCurrentUserQuery.getCurrentUser.username}
              tripCommentId={this.props.getTripQuery.getTrip.tripCommentId}
            />
            <AddComment 
              username={this.props.getCurrentUserQuery.getCurrentUser.username}
              tripCommentId={this.props.getTripQuery.getTrip.tripCommentId}
            />
          </div> : '' 
        }
      </div>
    );
  }
}


const WrapedTripInfo = compose(
  graphql(getTrip, {
    name: 'getTripQuery',
    options: props => (
      { variables: { id: Number(props.match.params.id) } }
    ), 
  }),
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
)(TripInfo);

export default WrapedTripInfo;

