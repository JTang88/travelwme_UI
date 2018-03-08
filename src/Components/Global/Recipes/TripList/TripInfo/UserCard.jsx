import React from 'react';
import { Image } from 'cloudinary-react';
import { Card, Icon } from 'semantic-ui-react';

function UserCard(props) {
  console.log('USERCARDDD', props);
  return (
    <Card>
      <Image cloudName="travelwme" className="rounded img-thumbnail" publicId={props.user.user.publicId} />
      <Card.Content>
        <Card.Header>
          {props.user.user.username}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>{props.user.user.gender}</div>
        <div>{props.user.user.age}</div>
        <div>{props.user.user.relationship}</div> 
        { props.creatorView ? 
          <div><button>Yes</button>or<button>No</button></div> : '' }
      </Card.Content>
    </Card>);
}

export default UserCard;
