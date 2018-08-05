import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Image } from 'cloudinary-react';
import Done from '@material-ui/icons/Done';
import { Card, CardContent, CardActions, withStyles, Typography, Button, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import updateUserRelationshipToTrip from '../../../graphql/mutations/updateUserRelationshipToTrip';
import deleteAUserFromTrip from '../../../graphql/mutations/deleteAUserFromTrip';
import { deleteAMemberFromCache } from '../../../graphql/mutations/deleteAMemberFromCache';
import { updateChatBoxState } from '../../../graphql/mutations/updateChatBoxState';
import updateTripStat from '../../../graphql/mutations/updateTripStat';
import MessageButton from '../../Global/Forms/MessageButton';

const styles = {
  card: {
    width: 270,
    maxHeight: 380,
    marginTop: 25,
    color: '#636e72',
  },
  cardContent: {
    position: 'relative',
    backgroundColor: '#ffffff',
    marginTop: 15,
    borderTop: '2px solid #dfe6e9',
    paddingTop: 10,
    paddingBottom: 10,
  },
  noButton: {
    marginLeft: 4,
  },
};

const UserCard = ({
  joinersOnly,
  classes: {
    card,
    cardContent,
    noButton,
  },
  creatorView,
  member: {
    user_type,
    forSureGoing,
    id: memberId,
    user: {
      publicId,
      username,
      gender,
      birthday,
      relationship,
      id: userId,
    },
  },
  trip: {
    id: tripId,
    creator: {
      username: senderName,
    },
    title: tripTitle,
  },
  updateUserRelationshipToTripMutation,
  updateTripStatMutation,
  deleteAUserFromTripMutation,
  deleteAMemberFromCacheMutation,
}) => {
  const handleYes = (e) => {
    e.preventDefault();
    updateUserRelationshipToTripMutation({
      variables: {
        userId,
        tripId,
        senderName,
        tripTitle,
        user_type: 'J',
      },
    });
    updateTripStatMutation({
      variables: {
        tripId,
        field: 'interesters',
        type: 'dec',
      },
    });
    updateTripStatMutation({
      variables: {
        tripId,
        field: 'joiners',
        type: 'inc',
      },
    });
  };

  const handleNo = (e) => {
    e.preventDefault();
    deleteAUserFromTripMutation({
      variables: {
        memberId,
      },
    });
    deleteAMemberFromCacheMutation({
      variables: {
        targetMemberId: memberId,
        tripId,
      },
    });
    updateTripStatMutation({
      variables: {
        tripId,
        field: 'interesters',
        type: 'dec',
      },
    });
  };

  return (
    <Link to={`/homepage/profile/${userId}`}>
      <Card className={card}>
        <Image
          className="member-pic" 
          cloudName="travelwme" 
          publicId={publicId}
        />
        <CardContent className={cardContent}>
          <Typography color="inherit" variant="body2">
            {username}
          </Typography>
          <Typography color="inherit" variant="body2">
            {gender}
          </Typography>
          <Typography color="inherit" variant="body2">
            {birthday}
          </Typography>
          <Typography color="inherit" variant="body2">
            {relationship}
          </Typography>
          {
            user_type === 'J' ?
              <Typography color="inherit" variant="body2">
                For Sure Going?
              </Typography> : null
          }
          <div className="done-icon-wrap">
            {
              forSureGoing === true ? <Done color="secondary" /> : ''
            }
          </div>
        </CardContent>
        <CardActions>
          <MessageButton receiverUserId={userId} />
          {
            creatorView ?
              <div>
                <Button size="small" variant="outlined" color="primary" onClick={handleYes}>Yes</Button>
                <Button className={noButton} size="small" variant="outlined" color="primary" onClick={handleNo}>No</Button>
              </div> : ''
          }
        </CardActions>
      </Card>
    </Link>
  );

}

const WrapedUserCard = compose(
  graphql(updateUserRelationshipToTrip, { name: 'updateUserRelationshipToTripMutation' }),
  graphql(deleteAUserFromTrip, { name: 'deleteAUserFromTripMutation' }),
  graphql(deleteAMemberFromCache, { name: 'deleteAMemberFromCacheMutation' }),
  graphql(updateChatBoxState, { name: 'updateChatBoxStateMutation' }),
  graphql(updateTripStat, { name: 'updateTripStatMutation' }),
)(withStyles(styles)(UserCard));

export default WrapedUserCard;