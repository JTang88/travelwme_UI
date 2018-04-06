import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom'; 
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import createTrip from '../../../graphql/mutations/createTrip';

class UserBox extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout(e) {
    this.props.client.resetStore();
    localStorage.removeItem('token');
  }


  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Hello {this.props.getCurrentUserQuery.getCurrentUser.username} !</h3>
        <Image className="UserBoxPic" cloudName="travelwme" publicId={this.props.getCurrentUserQuery.getCurrentUser.publicId} /> 
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/homepage/mytrip" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <h1>J</h1>
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link to="/homepage/profile" href="/homepage/profile" className="nav-item nav-link">Profile</Link>
            <Link to="/homepage/settings" href="/homepage/settings" className="dropdown-item">Settings</Link>
            <Link to="/login" href="/" className="nav-item nav-link" onClick={this.handleLogout}>Log out</Link>
          </div>
        </li>
      </div>
    );
  }
}


const WrapedUserBox = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(createTrip, {
    name: 'createTripMutation',
  }),
)(UserBox);

export default withApollo(WrapedUserBox);
