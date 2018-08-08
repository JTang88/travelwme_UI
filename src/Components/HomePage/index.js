import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import NavBar from './NavBar';
import TripInfo from './TripInfo';
import Created from './NavBar/Trips/Created';
import Joined from './NavBar/Trips/Joined';
import Waiting from './NavBar/Trips/Waiting';
import Going from './NavBar/Trips/Going';
import PlanTrip from './PlanTrip';
import SearchTrips from './SearchTrips';
import FoundTrips from './SearchTrips/FoundTrips';
import Profile from './Profile';
import TrendTrips from './TrendTrips';
import Settings from './Settings';
import ChatBox from './ChatBox';
import { getCurrentUser } from '../../graphql/queries/getCurrentUser';
import { getChatBoxState } from '../../graphql/queries/getChatBoxState';


class HomePage extends Component {

  render() {
    console.log('here is props in homepage', this.props);
    return (
      <div>
        { 
          this.props.getCurrentUserQuery.loading ? '' :
          <div>
            <NavBar 
              newMessage={this.props.getCurrentUserQuery.getCurrentUser.newMessage}
              newNotification={this.props.getCurrentUserQuery.getCurrentUser.newNotification}
            />
            <Switch>
              <Route exact path="/homepage" component={TrendTrips} />
              <Route path="/homepage/:tripType/tripinfo/:id" component={TripInfo} />
              <Route path="/homepage/created" component={Created} />
              <Route path="/homepage/joined" component={Joined} />
              <Route path="/homepage/waiting" component={Waiting} />
              <Route path="/homepage/going" component={Going} />
              <Route path="/homepage/settings" component={Settings} />
              <Route exact path="/homepage/search" component={SearchTrips} />
              <Route path="/homepage/foundtrips" component={FoundTrips} />
              <Route path="/homepage/plan" component={PlanTrip} />
              <Route exact path="/homepage/profile/" component={Profile} />
              <Route path="/homepage/profile/:id" component={Profile} />
            </Switch>
          </div>
        }
        {
          this.props.getChatBoxStateQuery.getChatBoxState.open ? 
            <ChatBox
              convoId={this.props.getChatBoxStateQuery.getChatBoxState.currentConvoId}
            /> : null
        }
      </div>
    );
  }
};

// currentUserId

const WrappedHomePage = compose(
  graphql(getCurrentUser, { 
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(getChatBoxState, {
    name: 'getChatBoxStateQuery',
  }),
)(HomePage);

export default WrappedHomePage;
