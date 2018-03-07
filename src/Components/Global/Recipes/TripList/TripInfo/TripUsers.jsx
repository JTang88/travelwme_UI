import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import UserCard from '../TripInfo/UserCard';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUserObj';
import findATypeOfTravelers from '../../../../../services/findATypeOfTravelers';

class TripUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creator: findATypeOfTravelers(this.props.members, 'C')[0],
    };
  }

  render() {
    return (
      <div>
        <div className="tripsub">Creator</div>
        <div className="row">
          { this.state.creator ? <UserCard user={this.state.creator} /> : '' }
        </div>
        <div className="tripsub">Joined</div>
        <div className="row">
          {findATypeOfTravelers(this.props.members, 'J').map(joiner => (
            <div className="col-4">
              <UserCard key={joiner.user.id} user={joiner} /> 
            </div>))}
        </div>
        <div className="tripsub">Interested</div>
        <div className="row">
          {findATypeOfTravelers(this.props.members, 'I').map(interester => (
            <div className="col-4">
              <UserCard key={interester.user.id} user={interester} />
            </div>))}
        </div>
        {
          this.props.data.getCurrentUser.id !== this.state.creator.user.id ? 
            <div className="trippic">
              <button>Ask to Join</button>
            </div> : ''
        }
      </div>
    );
  }
}

export default graphql(getCurrentUser)(TripUsers);

