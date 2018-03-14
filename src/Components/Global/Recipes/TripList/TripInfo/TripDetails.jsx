import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Image } from 'cloudinary-react';
import deleteAUserFromTrip from '../../../../../graphql/mutations/deleteAUserFromTrip';
import { deleteAMemberFromCache } from '../../../../../graphql/mutations/deleteAMemberFromCache';
import { invalidateAWaitingTripInCache } from '../../../../../graphql/mutations/invalidateAWaitingTripInCache';

// import updateUserRelationshipToTrip from '../../../../../graphql/mutations/updateUserRelationshipToTrip';
// import { updateCurrentUserRelationToTrip } from '../../../../../graphql/mutations/updateCurrentUserRelationToTrip';


class TripDetails extends Component {
  constructor(props) {
    super(props);
    this.handleCancelRequest = this.handleCancelRequest.bind(this);
  }

  handleCancelRequest(e) {
    e.preventDefault();
    this.props.deleteAUserFromTripMutation({
      variables: {
        memberId: this.props.currentMemberId,
      },
    });
    this.props.deleteAMemberFromCacheMutation({
      variables: {
        targetMemberId: this.props.currentMemberId,
        tripId: this.props.tripId,
      },
    });
    this.props.invalidateAWaitingTripInCacheMutation({
      variables: {
        userId: this.props.userId,        
        tripId: this.props.tripId,
      },
    });
  }
  
  render() {
    console.log('this is props in TripDetails: ', this.props)
    return (
      <div>
        <header className="masthead text-white text-center">
          <div>
            <h1 className="text-uppercase triptit">{this.props.trip.title}</h1>
          </div>
        </header>
        <div className="row">
          <div className="col-8">
            <Image cloudName="travelwme" className="rounded trippic" publicId={this.props.trip.creator.publicId} />
          </div>
          <div className="col-4 trippic">
            <h4>Description: {this.props.trip.description}</h4>
            <h4>Age start: {this.props.trip.age_start}</h4>
            <h4>Age end: {this.props.trip.age_end}</h4>
            <h4>Start Date: {this.props.trip.date_start}</h4>  
            <h4>End Date: {this.props.trip.date_end}</h4>
            <h4>Gender: {this.props.trip.gender}</h4>
            <h4>Trip Keywokds: {this.props.trip.trip_keywords}</h4>
            <h4>Trip BodyTypes: {this.props.trip.body_types}</h4>
            <h4>Relationship: {this.props.trip.relationship}</h4>
            <h4>Trip Status: {this.props.trip.trip_status}</h4>
            <h4>Cost: {this.props.trip.cost}</h4>
            {
              this.props.currentUser === 'C' ? 
                <div className="trippic">
                  <button>Edit This Trip</button>
                </div> : 
              this.props.currentUser === 'J' ? 
                <div className="trippic">
                  <button>Leave This Trip</button>
                </div> :
              this.props.currentUser === 'I' ? 
                <div className="trippic">
                  <button onClick={this.handleCancelRequest}>Cancel Request</button>
                </div> :
                <div className="trippic">
                  <button>Ask to Join</button>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
  
const WrapedTripDetails = compose(
  graphql(deleteAUserFromTrip, { name: 'deleteAUserFromTripMutation' }),
  graphql(deleteAMemberFromCache, { name: 'deleteAMemberFromCacheMutation' }),
  graphql(invalidateAWaitingTripInCache, { name: 'invalidateAWaitingTripInCacheMutation' })
)(TripDetails);

export default WrapedTripDetails;