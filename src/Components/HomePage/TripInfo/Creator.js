import React from 'react';
import { Paper, Typography, withStyles, Grid } from '@material-ui/core';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import MessageButton from '../../Global/Forms/MessageButton';

const styles = {
  root: {
    width: 360,
    marginLeft: 65,
    paddingTop: 25,
    minHeight: 420,
    paddingLeft: 25,
    paddingRight: 25,
    color: '#2d3436',
  },
  creatorTitle: {
    borderBottom: '2px solid #b2bec3',
  },
};

const Creator = ({
  trip: {
    creator: {
      id,
      publicId,
      username,
      gender,
      birthday,
      relationship,
      description,
    },
  },
  classes: {
    root,
    creatorTitle,
  },
  currentUserType,
}) => (
  <Link to={`/homepage/profile/${id}`}>
    <Paper className={root}>
      <Typography variant="title" color="inherit" className={creatorTitle} gutterBottom>
        Creator
      </Typography>
      <div className="creator-info-container">
        <Grid container >
          <Grid item sm={6}>
            <Image
              cloudName="travelwme" 
              className="creator-pic" 
              publicId={publicId}
            />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="body2" color="inherit">{username}</Typography>
            <Typography variant="body2" color="inherit">{gender}</Typography>
            <Typography variant="body2" color="inherit">{birthday}</Typography>
            <Typography variant="body2" color="inherit" gutterBottom>{relationship}</Typography>
            {
              currentUserType !== 'C' ?
                <MessageButton receiverUserId={id} /> : null
            }
          </Grid>
        </Grid>
      </div>
      <div className="about-me-container">
        <Typography variant="body2" color="inherit">About Me:</Typography>
        <Typography variant="body1" color="inherit">{description}</Typography>
      </div>
    </Paper>
  </Link>
);

export default withStyles(styles)(Creator);
