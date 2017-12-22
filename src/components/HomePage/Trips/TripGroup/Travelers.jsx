import React from 'react';
import { connect } from 'react-redux';

class Travelers extends React.Component {
  constructor(props) {
    super(props);
    this.showJoinedTravelers = this.showJoinedTravelers.bind(this);
  }

  showJoinedTravelers() {
    let showTravelers;
    if (this.props.triptrav.length === 0) {
      showTravelers = (<div>No Travelers</div>); }
    else {
      showTravelers = (<div className="row">
        {this.props.triptrav.map(user =>
      (<div key={user.id} className="col-sm-6 mb-lg-2">
        {user.username}
      </div>))}
      </div>)
    }
    return showTravelers;
  }

  render() {
    return (
      <div>
        {this.showJoinedTravelers()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    showtrip: state.showtrip,
    creator: state.creator,
    triptrav: state.triptrav,
    tripint: state.tripint,
  };
}

export default connect(mapStateToProps)(Travelers);
