import React from 'react';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';
import UserCard from '../TripInfo/UserCard';

class Travelers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <section className="masthead">
            <div>
              <h1 className="tripsub text-center text-white text-uppercase">Travelers</h1>
              <div className="row">
                <div className="col-6 col-md-4">
                  <UserCard user={this.props.creator} />
                </div>
                {this.props.triptrav.map(user =>
                (<div key={user.user.id} className="col-6 col-md-4">
                  <UserCard user={user} />
                </div>))}
              </div>
            </div>  
          </section>
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


    // this.showJoinedTravelers = this.showJoinedTravelers.bind(this);

  // showJoinedTravelers() {
  //   let showTravelers;
  //   if (this.props.triptrav.length === 0) { showTravelers = (<div />); }
  //   else {
  //     showTravelers = (
  //         {this.props.triptrav.map(user =>
  //       (<div key={user.user.id} className="col-md-6 col-lg-4">
  //         <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={user.user.publicId} />
  //         <h4>{user.user.username}</h4>
  //       </div>))})
  //   }
  //   return showTravelers;
  // }