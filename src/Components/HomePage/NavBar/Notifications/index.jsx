import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getTrip from '../../../../graphql/queries/getTrip';
import Accepted from './Accepted';

class Notifications extends Component {
  render() {
    console.log('here is props in Notifications', this.props);
    return (
      <Accepted />
    );
  }
}

export default Notifications;


// import item from ./item

// Make a Notification Component
  // map all items
    // when a item gets clicked, refetch all related queries (Chenged the refetch state to true)
    // and take user to the direct page



// Create a Main Notitcations Component
  // use getNotification query to get all notifications details (query and variables)
  // map each notifcations
    // when a notification matches a notifcation component type (Which you will create)
    // sends its varialbes to such compnent, (Each notification componet is a clickable link, which will updated the target querys and direct user to new result)

