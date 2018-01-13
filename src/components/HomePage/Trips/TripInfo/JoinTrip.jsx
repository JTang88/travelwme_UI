import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import tripTravelers from '../../../../actions/tripTravelersAction';
import tripInterested from '../../../../actions/tripInterestedAction';

class JoinTrip extends React.Component {
  constructor(props) {
    super(props);
    this.sendUserInterest = this.sendUserInterest.bind(this);
    this.renderJoinButton = this.renderJoinButton.bind(this);
  }

  sendUserInterest() {
    this.props.mutate({
      variables: { userId: this.props.auth.user.id, tripId: this.props.showtrip.id, user_type: "I" }
    })
      .then(({ data }) => {
        for (let i = 0; i < data.interestedInATrip.user.trips.length; i++) {
          if (data.interestedInATrip.user.trips[i].id === this.props.showtrip.id) {
            this.props.tripTravelers(data.interestedInATrip.user.trips[i].members);
            this.props.tripInterested(data.interestedInATrip.user.trips[i].members);
          }
        }
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  renderJoinButton() {
    let buttonJoin = (
      <Button onClick={this.sendUserInterest}>ASK TO JOIN!</Button>
    );

    const joinStatus = {
      J: 'JOINED',
      C: 'JOINED',
      I: 'PENDING',
      D: 'DECLINED',
    };

    if (this.props.showtrip.trip_status === 'open') {
      for (let i = 0; i < this.props.showtrip.members.length; i++) {
        if (this.props.auth.user.id === this.props.showtrip.members[i].user.id) {
          if (joinStatus[this.props.showtrip.members[i].user_type]) {
            buttonJoin = (
              <Button disabled>{joinStatus[this.props.showtrip.members[i].user_type]}</Button>
            );
          } 
        }
      }
    } else {
      buttonJoin = (
        <Button disabled>CLOSED</Button>
      );
    }

    return buttonJoin;
  }
  
  render() {
    return (
      <div>
        {this.renderJoinButton()}
        
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
    tripTravelers, tripInterested,
  }, dispatch);
}

const interestedInATrip = gql`
mutation interestedInATrip($userId: Int!, $tripId: Int!, $user_type: String!) {
    interestedInATrip(userId: $userId, tripId: $tripId, user_type: $user_type) {
      tripId
      user {
        trips {
          id
          title
          date_start
          date_end
          gender
          age_start
          age_end
          trip_status
          members {
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
      }
  }
}
`;

JoinTrip = graphql(interestedInATrip)(JoinTrip);

export default connect(mapStateToProps, matchDispatchToProps)(JoinTrip);