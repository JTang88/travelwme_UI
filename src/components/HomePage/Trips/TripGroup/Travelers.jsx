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
          <div>Travelers:</div>
          <div className="row">
            {this.props.triptrav.map(user =>
          (<div key={user.user.id} className="col-sm-6 mb-lg-2">
            <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={user.user.publicId} />
            <div>{user.user.username}</div>
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
          <div> Creator:</div>
          <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={this.props.creator.publicId} />
          <div>{this.props.creator.user.username}</div>
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
