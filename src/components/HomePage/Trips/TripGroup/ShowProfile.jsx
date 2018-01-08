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
            <div className="row">
              <div className="col-12">
                <Image cloudName="travelwme" className="rounded img-thumbnail col-12" publicId={this.props.tripint[i].user.publicId} />
                <h4 className="col-12">{this.props.tripint[i].user.username}</h4>
                <h4 className="col-12">{this.props.tripint[i].user.gender}</h4>
                <h4 className="col-12">{this.props.tripint[i].user.age}</h4>
                <h4 className="col-12">{this.props.tripint[i].user.body_type}</h4>
                <h4 className="col-12">{this.props.tripint[i].user.description}</h4>
                <h4 className="col-12">{this.props.tripint[i].user.email}</h4>
                <h4 className="col-12">{this.props.tripint[i].user.relationship}</h4>       
              </div>
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

