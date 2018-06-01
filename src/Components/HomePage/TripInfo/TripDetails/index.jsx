import React, { Component } from 'react';
import TripStatusButton from './TripStatusButton';
import CancelOrLeaveButton from './CancelOrLeaveButton';
import AskToJoinButton from './AskToJoinButton';
import ForSureGoingButton from './ForSureGoingButton';


class TripDetails extends Component {
  render() {
    console.log('render trip details');
    return (
      <div>
        <div className="row">
          <div className="col-4 trippic">
            <h4>Country: {JSON.parse(this.props.trip.countries).join(' ')}</h4>
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
              this.props.currentUserType === 'C' ? 
                <TripStatusButton 
                  currentStatus={this.props.trip.trip_status} 
                  id={this.props.trip.id}  
                /> :                   
              this.props.currentUserType === 'J' && !this.props.currentMember.forSureGoing ? 
                <div className="trippic">
                  <CancelOrLeaveButton
                    tripType={'joined'} 
                    memberId={this.props.currentMember.id}
                    tripId={this.props.tripId}
                    userId={this.props.userId}
                  >
                    Leave this Trip
                  </CancelOrLeaveButton>
                    let the world know that you are for sure going
                  <ForSureGoingButton 
                    memberId={this.props.currentMember.id}
                    tripId={this.props.tripId}
                    userId={this.props.userId}
                    tripType={'joined'}
                  />
                </div> :
              this.props.currentUserType === 'I' ? 
                <div className="trippic">
                  <CancelOrLeaveButton
                    tripType={'waiting'}
                    memberId={this.props.currentMember.id}
                    tripId={this.props.tripId}
                    userId={this.props.userId}
                  >
                    Leave this Trip
                  </CancelOrLeaveButton>
                </div> :
              this.props.currentUserType === 'N' ?
                <div className="trippic">
                  <AskToJoinButton
                    senderName={this.props.username}
                    creatorId={this.props.trip.creator.id}
                    tripTitle={this.props.trip.title}
                    userId={this.props.userId}
                    tripId={this.props.tripId}
                    tripType={this.props.tripType}
                  />
                </div> : 'You are for sure going on this trip!'
            }
          </div>
        </div>
      </div>
    );
  }
}

export default TripDetails;