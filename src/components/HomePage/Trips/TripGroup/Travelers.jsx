import React from 'react';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';

class Travelers extends React.Component {
  constructor(props) {
    super(props);
    this.showJoinedTravelers = this.showJoinedTravelers.bind(this);
  }

  showJoinedTravelers() {
    let showTravelers;
    if (this.props.triptrav.length === 0) {
      showTravelers = (<div>Travelers: None at this time</div>); }
    else {
      showTravelers = (
        <div>
          <h2>Travelers:</h2>
          <div className="row">
            {this.props.triptrav.map(user =>
          (<div key={user.user.id} className="col-sm-6 mb-lg-2">
            <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={user.user.publicId} />
            <h4>{user.user.username}</h4>
          </div>))}
          </div>
        </div>)
    }
    return showTravelers;
  }

  render() {
    return (
      <div>
        <div>
          <h2> Creator:</h2>
          <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={this.props.creator.user.publicId} />
          <h4>{this.props.creator.user.username}</h4>
        </div>
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
