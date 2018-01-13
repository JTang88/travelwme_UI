import React from 'react';
import { connect } from 'react-redux';
import UserCard from '../TripInfo/UserCard';

class ShowProfile extends React.Component {
  constructor(props) {
    super(props);
    this.displaySelectedUser = this.displaySelectedUser.bind(this);
  }

  displaySelectedUser() {
    if (this.props.selected) {
      for (let i = 0; i < this.props.tripint.length; i++) {
        if (this.props.tripint[i].user.id === parseInt(this.props.selected)) {
          return (
            <UserCard user={this.props.tripint[i]} />
          );
        }
      }
    }
  }

  render() {
    return (
      <div className="col-4 trippic">
        {this.displaySelectedUser()}
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


export default connect(mapStateToProps)(ShowProfile);