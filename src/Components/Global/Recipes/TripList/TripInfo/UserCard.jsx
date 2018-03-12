import React, { Component } from 'react';
import { graphql } from 'react-apollo'; 
import { Image } from 'cloudinary-react';
import { Card } from 'semantic-ui-react';
import updateUserRelationshipToTrip from '../../../../../graphql/mutations/updateUserRelationshipToTrip';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.handleYes = this.handleYes.bind(this);
  }
 
  handleYes(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        userId: this.props.user.user.id,
        tripId: this.props.tripId,
        user_type: 'J',
      },
    });
  }

  render() {
    return (
      <Card>
        <Image cloudName="travelwme" width="300" crop="scale" className="rounded img-thumbnail" publicId={this.props.user.user.publicId} />
        <Card.Content>
          <Card.Header>
            {this.props.user.user.username}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div>{this.props.user.user.gender}</div>
          <div>{this.props.user.user.age}</div>
          <div>{this.props.user.user.relationship}</div> 
          { this.props.creatorView ? 
            <div><button onClick={this.handleYes}>Yes</button>or<button>No</button></div> : '' }
        </Card.Content>
      </Card>
    );
  }
}


const WrapedUserCard = graphql(updateUserRelationshipToTrip)(UserCard);

export default WrapedUserCard;