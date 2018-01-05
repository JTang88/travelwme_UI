import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import tripTravelers from '../../../../actions/tripTravelersAction';
import tripInterested from '../../../../actions/tripInterestedAction';
import updateTravelers from '../../../../actions/tripTravelerUpdateAction';
import ShowProfile from './ShowProfile';

class ApproveTrav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      decision: '',
    };

    this.checkCreator = this.checkCreator.bind(this);
    this.updateUserTripStatus = this.updateUserTripStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value
    const name = target.name;

    this.setState({
      [name]: value,
    });  
  }


  updateUserTripStatus() {
    let travelersup = {};
    this.props.mutate({
      variables: { userId: this.state.user, tripId: this.props.showtrip.id, user_type: this.state.decision },
    })
      .then(({ data }) => {
        travelersup = {
          trips: this.props.mytrips,
          id: this.props.showtrip.id,
          members: data.updateUserRelationshipToTrip.members,
        };
        this.props.updateTravelers(travelersup);
        this.props.tripTravelers(data.updateUserRelationshipToTrip.members);
        this.props.tripInterested(data.updateUserRelationshipToTrip.members);
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });

  }

  checkCreator() {
    let showInterestedUsers;
    if (this.props.creator.user.id === this.props.auth.user.id) {
      showInterestedUsers = (
        <div>
          <form>
            <div className="d-flex flex-column" id="search-bar">
              <h2>Interested Users: </h2>
              <div>
                <select name="user" onChange={this.handleChange}>
                  <option defaultValue value="Users">Users</option>
                  {this.props.tripint.map( user =>
                    (<option key={user.user.id} value={user.user.id}>
                      {user.user.username}</option>))}
                </select>
              </div>
              <div>
                <select name="decision" onChange={this.handleChange}>
                  <option defaultValue value="Choose">Choose...</option>
                  <option value="J">Approve</option>
                  <option value="D">Decline</option>
                </select>
              </div>
            </div>
          </form>
          <button onClick={this.updateUserTripStatus}>Submit</button>
        </div>);
    }
    return showInterestedUsers;
  }

  render() {
    return (
      <div>
        {this.checkCreator()}
        <ShowProfile selected={this.state.user} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    mytrips: state.mytrips,
    showtrip: state.showtrip,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
  };
}

const interestedInATrip = gql`
mutation updateUserRelationshipToTrip($userId: Int!, $tripId: Int!, $user_type: String!) {
  updateUserRelationshipToTrip(userId: $userId, tripId: $tripId, user_type: $user_type) {
    id
    title
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
`;

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    tripTravelers, tripInterested, updateTravelers,
  }, dispatch);
}

const Approve = graphql(interestedInATrip)(ApproveTrav);

export default connect(mapStateToProps, matchDispatchToProps)(Approve);
