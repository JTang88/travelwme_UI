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
        for (let i = 0; i < data.interestedInATrip.users[0].trips.length; i++) {
          if (data.interestedInATrip.users[0].trips[i].id === this.props.showtrip.id) {
            this.props.tripTravelers(data.interestedInATrip.users[0].trips[0].users);
            this.props.tripInterested(data.interestedInATrip.users[0].trips[0].users);
          }
        }
        console.log('interrrr', this.props.tripint);
        console.log('travvvvv', this.props.triptrav);  
        console.log('got data', data);
        //update interested and joined list of travelers
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  renderJoinButton() {
    let buttonJoin;
    console.log('JOINTRIPPPPPP', this.props.showtrip.users);
    console.log('USERRRRR', this.props.auth.user.id);
    if (this.props.showtrip.trip_status === 'open') {
      for (let i = 0; i < this.props.showtrip.users.length; i++) {
        if (this.props.showtrip.users[i].id === this.props.auth.user.id) {
          if (this.props.showtrip.users[i].user_type === 'J') {
            buttonJoin = (
              <button disabled>JOINED</button>
            );
          } else if (this.props.showtrip.users[i].user_type === 'C') {
            buttonJoin = (
              <button disabled>JOINED</button>
            );
          } else if (this.props.showtrip.users[i].user_type === 'I') {
            buttonJoin = (
              <button disabled>PENDING</button>
            );
          } else if (this.props.showtrip.users[i].user_type === 'D') {
            buttonJoin = (
              <button disabled>DECLINED</button>
            );
          }
        } else {
          buttonJoin = (
            <button onClick={this.sendUserInterest}>ASK TO JOIN!</button>
          );
        }
      }
    } else {
      buttonJoin = (
        <button disabled>CLOSED</button>
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
      users {
        trips {
        id
        title
        date_start
        date_end
        gender
        age_start
        age_end
        trip_status
        user_type
        users{
          id
          username
          user_type
        }
      }
    }
  }
}
`;

JoinTrip = graphql(interestedInATrip)(JoinTrip);

export default connect(mapStateToProps, matchDispatchToProps)(JoinTrip);