import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import NavBar from './NavBar';
import TripInfo from '../Global/Recipes/TripList/TripInfo';
import Created from '../HomePage/Trips/Created';
import Joined from '../HomePage/Trips/Joined';
import Waiting from '../HomePage/Trips/Waiting';
import Going from '../HomePage/Trips/Going';
import PlanTrip from './PlanTrip';
import SearchTrips from './SearchTrips';
import FoundTrips from './SearchTrips/FoundTrips';
import Profile from '../Global/Recipes/Profile';
import TrendTrips from './TrendTrips';
import Settings from './Settings';
import ChatBox from './ChatBox';
import getBasicUserInfo from '../../graphql/queries/getBasicUserInfo';
import { updateCurrentUser } from '../../graphql/mutations/updateCurrentUser';
import { getCurrentUser } from '../../graphql/queries/getCurrentUser';
import { getChatBoxState } from '../../graphql/queries/getChatBoxState';
import { updateChatBoxState } from '../../graphql/mutations/updateChatBoxState';


class HomePage extends Component {
  componentDidUpdate(nextProps) {
    if (nextProps.getBasicUserInfoQuery.getUser !== this.props.getBasicUserInfoQuery.getUser) {
      this.props.updateCurrentUserMutation({
        variables: this.props.getBasicUserInfoQuery.getUser,
      });
    }
  }

  render() {
    console.log('here is props in homepage', this.props)
    return (
      <div>
        { 
          this.props.getCurrentUserQuery.getCurrentUser.username === '' ? '' :
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/homepage" component={TrendTrips} />
              <Route path="/homepage/:tripType/tripinfo/:id" component={TripInfo} />
              <Route path="/homepage/created" component={Created} />
              <Route path="/homepage/joined" component={Joined} />
              <Route path="/homepage/waiting" component={Waiting} />
              <Route path="/homepage/going" component={Going} />
              <Route path="/homepage/settings" component={Settings} />
              <Route exact path="/homepage/searchtrips" component={SearchTrips} />
              <Route path="/homepage/foundtrips" component={FoundTrips} />
              <Route path="/homepage/plantrip" component={PlanTrip} />
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

const WrappedHomePage = compose(
  graphql(getCurrentUser, { 
    name: 'getCurrentUserQuery',
  }),
  graphql(getChatBoxState, {
    name: 'getChatBoxStateQuery',
  }),
  graphql(getBasicUserInfo, { 
    name: 'getBasicUserInfoQuery',
    options: props => ({ 
      variables: { id: props.getCurrentUserQuery.getCurrentUser.id },
    }),
  }),
  graphql(updateCurrentUser, {
    name: 'updateCurrentUserMutation',
  }),
  graphql(updateChatBoxState, {
    name: 'updateChatBoxStateMutation',
  })
)(HomePage);

export default WrappedHomePage;
