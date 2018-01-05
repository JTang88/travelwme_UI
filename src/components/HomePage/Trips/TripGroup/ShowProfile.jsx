import React from 'react';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';

class ShowProfile extends React.Component {
  constructor(props) {
    super(props);
    this.displaySelectedUser = this.displaySelectedUser.bind(this);
  }

  displaySelectedUser() {
    let profile;
    if (this.props.selected) {
      for (let i = 0; i < this.props.tripint.length; i++) {
        if (this.props.tripint[i].user.id === parseInt(this.props.selected)) {
          profile = (
            <div>
              <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={this.props.tripint[i].user.publicId} />
              <br />
              {this.props.tripint[i].user.username}
              <br />
              {this.props.tripint[i].user.gender}
              <br />
              {this.props.tripint[i].user.age}
              <br />
              {this.props.tripint[i].user.body_type}
              <br />
              {this.props.tripint[i].user.description}
              <br />
              {this.props.tripint[i].user.email}
              <br />
              {this.props.tripint[i].user.relationship}         
            </div>
          );
        }
      }
    }
    return profile;
  }

  render() {
    return (
      <div>
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

