import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
        console.log('got data', data);
        for (let i = 0; i < data.interestedInATrip.user.trips.length; i++) {
          if (data.interestedInATrip.user.trips[i].id === this.props.showtrip.id) {
            this.props.tripTravelers(data.interestedInATrip.user.trips[i].members);
            this.props.tripInterested(data.interestedInATrip.user.trips[i].members);
          }
        }
        console.log('interrrr', this.props.tripint);
        console.log('travvvvv', this.props.triptrav);  
        //update interested and joined list of travelers
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  renderJoinButton() {
    let buttonJoin;
    const joinStatus = {
      J: 'JOINED',
      C: 'JOINED',
      I: 'PENDING',
      D: 'DECLINED',
    };

    if (this.props.showtrip.trip_status === 'open') {
      if (joinStatus[this.props.showtrip.user_type]) {
        buttonJoin = (
          <button disabled>{joinStatus[this.props.showtrip.user_type]}</button>
        );
      } else {
        buttonJoin = (
          <button onClick={this.sendUserInterest}>ASK TO JOIN!</button>
        );
      }
    } else {
      buttonJoin = (
        <button disabled>CLOSED</button>
      );
    }
    console.log('USERRRRR', this.props.auth.user.id);
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
              username
              id
            }
          }
        }
      }
  }
}
`;

JoinTrip = graphql(interestedInATrip)(JoinTrip);

export default connect(mapStateToProps, matchDispatchToProps)(JoinTrip);