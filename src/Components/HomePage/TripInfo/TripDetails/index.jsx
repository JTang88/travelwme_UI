import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { addNewlyInterestedTripToList } from '../../../../graphql/mutations/addNewlyInterestedTripToList';
import interestedInATrip from '../../../../graphql/mutations/interestedInATrip';
import forSureGoing from '../../../../graphql/mutations/forSureGoing';
import updateTripStat from '../../../../graphql/mutations/updateTripStat';
import getTrip from '../../../../graphql/queries/getTrip';
import { moveAJoinedTripToGoingList } from '../../../../graphql/mutations/moveAJoinedTripToGoingList';
import { getCurrentSearchTerms } from '../../../../graphql/queries/getCurrentSearchTerms';
import { addFoundTripToList } from '../../../../graphql/mutations/addFoundTripToList';
import updateTripDescription from '../../../../graphql/mutations/updateTripDescription';
import MessageButton from '../../../Global/Forms/MessageButton';
import Description from './Description';
import TripStatusButton from './TripStatusButton';
import CancelOrLeaveButton from './CancelOrLeaveButton';


class TripDetails extends Component {
  constructor(props) {
    super(props);
    this.handleAskToJoin = this.handleAskToJoin.bind(this);
    this.handleForSureGoing = this.handleForSureGoing.bind(this);
  }

  handleAskToJoin(e) {      
    e.preventDefault();
    this.props.interestedInATripMutation({
      variables: {
        senderName: this.props.username,
        creatorId: this.props.trip.creator.id,
        tripTitle: this.props.trip.title,
        userId: this.props.userId,        
        tripId: this.props.tripId,
      },
      update: (proxy, { data: { interestedInATrip } }) => {
        const data = proxy.readQuery({ query: getTrip, variables: { id: this.props.tripId } });
        data.getTrip.members.push(interestedInATrip);
        proxy.writeQuery({ query: getTrip, variables: { id: this.props.tripId }, data });
      },
    });

    if (this.props.tripType === 'trend') {
      this.props.addNewlyInterestedTripToListMutation({
        variables: {
          userId: this.props.userId,        
          tripId: this.props.tripId,
        },
      });
    } else {
      this.props.addFoundTripToListMutation({
        variables: {
          ...this.props.getCurrentSearchTermsQuery.getCurrentSearchTerms,
          tripId: this.props.tripId,
        },
      });
    }

    this.props.updateTripStatMutation({
      variables: {
        tripId: this.props.tripId, 
        field: 'interesters',
        type: 'inc',
      },
    });
  }

  async handleForSureGoing(tripType, e) {
    e.preventDefault();
    this.props.forSureGoingMutation({
      variables: {
        memberId: this.props.currentMemberId, 
        tripId: this.props.tripId,
      },
    });
    this.props.updateTripStatMutation({
      variables: {
        tripId: this.props.tripId, 
        field: 'forSureGoing',
        type: 'inc',
      },
    });
    await this.props.moveAJoinedTripToGoingListMutation({
      variables: {
        userId: this.props.userId,        
        tripId: this.props.tripId,      
      },
    });
    this.props.invalidateATripInCacheMutation({
      variables: {
        userId: this.props.userId,        
        tripId: this.props.tripId,
        tripType,
      },
    });
  }
  

  render() {
    console.log('render trip details');
    return (
      <div>
        <header className="masthead text-white text-center">
          <div>
            <h1 className="text-uppercase triptit">{this.props.trip.title}</h1>
          </div>
        </header>
        <div className="row">
          <Link to={`/homepage/profile/${this.props.trip.creator.id}`} href={`/homepage/profile/${this.props.trip.creator.id}`}>
            <div className="col-4">
              <h4>Creator</h4>
              <Image cloudName="travelwme" className="rounded" publicId={this.props.trip.creator.publicId} />
            </div>
            <div className="col-4">
              <li>
                <ul>{this.props.trip.creator.username}</ul>
                <ul>{this.props.trip.creator.gender}</ul>
                <ul>{this.props.trip.creator.age}</ul>
                <ul>{this.props.trip.creator.relationship}</ul>
                {
                  this.props.userId !== this.props.trip.creator.id ? 
                    <MessageButton receiverUserId={this.props.trip.creator.id} /> : null
                }
              </li>
            </div>
          </Link>
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
            <Description
              currentUser={this.props.currentUser}
              tripId={this.props.trip.id}
              description={this.props.trip.description}
            />
            {
              this.props.currentUser === 'C' ? 
                <TripStatusButton 
                  currentStatus={this.props.trip.trip_status} 
                  id={this.props.trip.id}  
                /> :                   
              this.props.currentUser === 'J' && !this.props.currentMember.forSureGoing ? 
                <div className="trippic">
                  <CancelOrLeaveButton
                    tripType={'joined'} 
                    memberId={this.props.currentMemberId}
                    tripId={this.props.tripId}
                    userId={this.props.userId}
                  >
                    Leave this Trip
                  </CancelOrLeaveButton>
                    let the world know that you are for sure going
                  <button onClick={e => this.handleForSureGoing('joined', e)}>for Sure Going!</button>
                </div> :
              this.props.currentUser === 'I' ? 
                <div className="trippic">
                  <CancelOrLeaveButton
                    tripType={'waiting'}
                    memberId={this.props.currentMemberId}
                    tripId={this.props.tripId}
                    userId={this.props.userId}
                  >
                    Leave this Trip
                  </CancelOrLeaveButton>
                </div> :
              this.props.currentUser === 'N' ?
                <div className="trippic">
                  <button onClick={this.handleAskToJoin}>Ask to Join</button>
                </div> : 'You are for sure going on this trip!'
            }
          </div>
        </div>
      </div>
    );
  }
}
  
const WrapedTripDetails = compose(
  graphql(interestedInATrip, { name: 'interestedInATripMutation' }),
  graphql(addNewlyInterestedTripToList, { name: 'addNewlyInterestedTripToListMutation' }),
  graphql(forSureGoing, { name: 'forSureGoingMutation' }),
  graphql(updateTripStat, { name: 'updateTripStatMutation' }),
  graphql(getCurrentSearchTerms, { name: 'getCurrentSearchTermsQuery' }),
  graphql(moveAJoinedTripToGoingList, { name: 'moveAJoinedTripToGoingListMutation' }),
  graphql(addFoundTripToList, { name: 'addFoundTripToListMutation' }),
  graphql(updateTripDescription, { name: 'updateTripDescriptionMutation' }),
)(TripDetails);

export default WrapedTripDetails;