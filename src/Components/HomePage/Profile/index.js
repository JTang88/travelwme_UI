import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Image } from 'cloudinary-react';
import { Typography, withStyles, Button } from '@material-ui/core';
import EditProfile from './EditProfile'
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import getUser from '../../../graphql/queries/getUser';
import GeneralHeader from '../GeneralHeader';
import MessageButton from '../../Global/Forms/MessageButton';
import getAge from '../../../services/getAge';
import './index.css';


const styles = {
  q: {
    float: 'left',
  },
  a: {
    float: 'right',
  },
}

class Profile extends React.Component {
  state = {
    edit: false,
  }

  activateEdit = () => {
    this.setState({
      edit: !this.state.edit,
    })
  }

  render() {
    console.log('states in profile', this.state)
    const { classes: { q, a } } = this.props;
    if (this.state.edit) {
      return (
        <EditProfile
          user={this.props.getUserQuery.getUser}
          activateEdit={this.activateEdit}
        /> 
      )
    } else {
      return (
        !this.props.getUserQuery.loading ?
          <div>
            <GeneralHeader>
              Profile
            </GeneralHeader>
            <div className="profile-container">
              <Image
                className="profile-pic"
                cloudName="travelwme"
                publicId={this.props.getUserQuery.getUser.publicId}
              />
              <div className="info-container">
                <div>
                  <Typography
                    className={q}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    Name:
                </Typography>
                  <Typography
                    className={a}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    {this.props.getUserQuery.getUser.username}
                  </Typography>
                  <div className="clearfix" />
                </div>
                <div>
                  <Typography
                    className={q}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    Gender:
                  </Typography>
                  <Typography
                    className={a}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    {this.props.getUserQuery.getUser.gender}
                  </Typography>
                  <div className="clearfix" />
                </div>
                <div>
                  <Typography
                    className={q}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    Relationship:
                  </Typography>
                  <Typography
                    className={a}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    {this.props.getUserQuery.getUser.relationship}
                  </Typography>
                  <div className="clearfix" />
                </div>
                <div>
                  <Typography
                    className={q}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    Age:
                  </Typography>
                  <Typography
                    className={a}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    {getAge(this.props.getUserQuery.getUser.birthday)}
                  </Typography>
                  <div className="clearfix" />
                </div>   
                <div>
                  <Typography
                    className={q}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    Member Since:
                  </Typography>
                  <Typography
                    className={a}
                    variant="body2"
                    color="inherit"
                    gutterBottom
                  >
                    {this.props.getUserQuery.getUser.createdAt.substring(0, 10)}
                  </Typography>
                  <div className="clearfix" />
                </div>   
              </div>   
              <div className="about-container">
                <Typography
                  variant="body2"
                  color="inherit"
                  gutterBottom
                >
                  About:
                </Typography>
                <Typography
                  variant="body2"
                  color="inherit"
                >
                  {this.props.getUserQuery.getUser.description}
                </Typography>
              </div>
              {
                this.props.match.params.id && Number(this.props.match.params.id) !== this.props.getCurrentUserQuery.getCurrentUser.id ?
                  <MessageButton receiverUserId={Number(this.props.match.params.id)} /> : null
              }
              {
                this.props.getCurrentUserQuery.getCurrentUser.id === this.props.getUserQuery.getUser.id ?
                  <Button size="small" variant="contained" color="primary" onClick={this.activateEdit} >Edit</Button> : ''
              }   
            </div>
          </div> : 'loading'
      )
    }
  }
}


const WrapedProfile = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(getUser, {
    name: 'getUserQuery',
    options: props => (
      { variables: { id: props.match.params.id ? props.match.params.id : props.getCurrentUserQuery.getCurrentUser.id } }
    ), 
  }),
)(withStyles(styles)(Profile));

export default WrapedProfile;
