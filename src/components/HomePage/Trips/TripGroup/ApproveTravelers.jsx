import React from 'react';
import { connect } from 'react-redux';

class ApproveTrav extends React.Component {
  constructor(props) {
    super(props);
    this.checkCreator = this.checkCreator.bind(this);
  }

  checkCreator() {
    let showInterestedUsers;
    console.log('CREATORRR', this.props.creator)
    console.log('id', this.props.userid)
    console.log('travelers', this.props.triptrav)
    console.log('intttterest', this.props.tripint)
    if (this.props.creator.id === this.props.userid) {
      showInterestedUsers = (
      <div>
        {this.props.tripint.map(user =>
          (<div key={user.id}>
            Approve: 
            {user.username}
          </div>))}
      </div>)
    }
    return showInterestedUsers;
  }

  render() {
    return (
      <div>
        {this.checkCreator()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    showtrip: state.showtrip,
    userid: state.userid,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
  };
}

export default connect(mapStateToProps)(ApproveTrav);
