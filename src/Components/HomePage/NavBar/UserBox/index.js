import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { Menu, MenuItem } from '@material-ui/core'; 
import { Image } from 'cloudinary-react';
import { withRouter } from 'react-router-dom';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import createTrip from '../../../../graphql/mutations/createTrip';
import PicButton from './picButton';

class UserBox extends Component {
  state = {
    anchorEl: null
  };

  handleLogout = async () => {
    this.props.client.resetStore();
    await sessionStorage.removeItem('token');
    this.props.history.push('/')
  }

  handlePicClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSelect = value => {
    this.props.history.push(`/homepage/${value}`)
    this.setState({
      anchorEl: null,
    });
  };


  render() {
    const { anchorEl } = this.state;
    return (
      <div style={{ display: 'inline' }}>
        <PicButton onClick={this.handlePicClick}>
          <Image
            className="UserBoxPic"
            cloudName={process.env.REACT_APP_CLOUDNAME}
            publicId={this.props.getCurrentUserQuery.getCurrentUser.publicId} 
          />          
        </PicButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={() => this.handleSelect('profile')}>Profile</MenuItem>
          <MenuItem onClick={() => this.handleSelect('settings')}>Settings</MenuItem>
          <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
        </Menu>
      </div>
    );
  }
}


const WrapedUserBox = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(createTrip, {
    name: 'createTripMutation',
  }),
)(UserBox);

export default withApollo(withRouter(WrapedUserBox));
