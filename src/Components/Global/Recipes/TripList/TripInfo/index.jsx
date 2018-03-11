import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUser';
import makeTravelerObjByTypes from '../../../../../services/makeTravelerObjByTypes';
import getTrip from '../../../../../graphql/queries/getTrip';

class TripInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelers: undefined,
    };
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
    // this.state.travelers ? console.log('this is currentUser in Cached: ', this.state.travelers.currentUserCachedInMembers) : '';
    this.state.travelers ? 
    console.log(this.props.getTripQuery.getTrip.members) : '';

      // console.log(this.props.getTripQuery.getTrip.members[this.state.travelers.currentUserIndexInMembers]) : '';
    return (
      <div>
        { this.state.travelers ? 
          <TripDetails 
            trip={this.props.getTripQuery.getTrip}
            currentUser={this.state.travelers.currentUser}
            userId={this.props.getCurrentUserQuery.getCurrentUser.id}
            memberId={this.state.travelers.memberId}
          /> : '' 
        }
        <div className="trippic">
          { this.state.travelers ? 
            <TripUsers 
              interesters={this.state.travelers.interesters}
              joiners={this.state.travelers.joiners} 
              currentUser={this.state.travelers.currentUser}
            /> : ''
          } 
        </div>
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

