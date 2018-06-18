import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'; 
import { Image } from 'cloudinary-react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import updateUserRelationshipToTrip from '../../../graphql/mutations/updateUserRelationshipToTrip';
import deleteAUserFromTrip from '../../../graphql/mutations/deleteAUserFromTrip';
import { deleteAMemberFromCache } from '../../../graphql/mutations/deleteAMemberFromCache';
import { updateChatBoxState } from '../../../graphql/mutations/updateChatBoxState';
import updateTripStat from '../../../graphql/mutations/updateTripStat';
import MessageButton from '../../Global/Forms/MessageButton';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }
 
  handleYes(e) {
    e.preventDefault();
    this.props.updateUserRelationshipToTripMutation({
      variables: {
        userId: this.props.member.user.id,
        tripId: this.props.tripId,
        senderName: this.props.trip.creator.username,
        tripTitle: this.props.trip.title,
        user_type: 'J',
      },
    });
    this.props.updateTripStatMutation({
      variables: {
        tripId: this.props.tripId,
        field: 'interesters',
        type: 'dec',
      },
    });
    this.props.updateTripStatMutation({
      variables: {
        tripId: this.props.tripId,
        field: 'joiners',
        type: 'inc',
      },
    });
  }

  handleNo(e) {
    e.preventDefault();
    this.props.deleteAUserFromTripMutation({
      variables: {
        memberId: this.props.member.id,
      },
    });
    this.props.deleteAMemberFromCacheMutation({
      variables: {
        targetMemberId: this.props.member.id,
        tripId: this.props.tripId,
      },
    });
    this.props.updateTripStatMutation({
      variables: {
        tripId: this.props.tripId,
        field: 'interesters',
        type: 'dec',
      },
    });
  }

  render() {
    return (
      <Link to={`/homepage/profile/${this.props.member.user.id}`} href={`/homepage/profile/${this.props.member.user.id}`}>
        <Card>
          <Image cloudName="travelwme" width="300" crop="scale" className="rounded img-thumbnail" publicId={this.props.member.user.publicId} />
          <Card.Content>
            <Card.Header>
              {this.props.member.user.username}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <div>{this.props.member.user.gender}</div>
            <div>{this.props.member.user.birthday}</div>
            <div>{this.props.member.user.relationship}</div> 
            <div>for Sure Going? {this.props.member.forSureGoing? 'true' : 'false' }</div> 
            <MessageButton receiverUserId={this.props.member.user.id} />
            { this.props.creatorView ? 
              <div><button onClick={this.handleYes}>Yes</button>or<button onClick={this.handleNo}>No</button></div> : '' }
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

const WrapedUserCard = compose(
  graphql(updateUserRelationshipToTrip, { name: 'updateUserRelationshipToTripMutation' }),
  graphql(deleteAUserFromTrip, { name: 'deleteAUserFromTripMutation' }),
  graphql(deleteAMemberFromCache, { name: 'deleteAMemberFromCacheMutation' }),
  graphql(updateChatBoxState, { name: 'updateChatBoxStateMutation' }),
  graphql(updateTripStat, { name: 'updateTripStatMutation' }),
)(UserCard);

export default WrapedUserCard;
