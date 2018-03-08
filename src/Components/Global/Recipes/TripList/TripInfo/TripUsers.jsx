import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import UserCard from '../TripInfo/UserCard';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUser';
import makeTravelerObjByTypes from '../../../../../services/makeTravelerObjByTypes';

class TripUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelers: makeTravelerObjByTypes(
        this.props.members, 
        this.props.data.getCurrentUser.id,
      ),
    };
  }

  render() {
    return (
      <div>
        <div className="tripsub">Creator</div>
        <div className="row">
          { this.state.travelers ? <UserCard user={this.state.travelers.creator} /> : '' }
        </div>
        <div className="tripsub">Joined</div>
        <div className="row">
          {this.state.travelers.joiners.map(joiner => (
            <div className="col-4">
              <UserCard 
                key={joiner.user.id} 
                user={joiner} 
              /> 
            </div>))}
        </div>
        <div className="tripsub">Interested</div>
        <div className="row">
          {this.state.travelers.interesters.map(interester => (
            <div className="col-4">
              <UserCard 
                key={interester.user.id} 
                user={interester} 
                creatorView={this.state.travelers.currentUser === 'C'}
              />
            </div>))}
        </div>
        {
          this.state.travelers.currentUser === 'C' ? 
            <div className="trippic">
              <button>Edit This Trip</button>
            </div> : 
          this.state.travelers.currentUser === 'J' ? 
            <div className="trippic">
              <button>Leave This Trip</button>
            </div> :
          this.state.travelers.currentUser === 'I' ? 
            <div className="trippic">
              <button>Cancel Request</button>
            </div> :
            <div className="trippic">
              <button>Ask to Join</button>
            </div>
        }
      </div>
    );
  }
}

export default graphql(getCurrentUser)(TripUsers);

