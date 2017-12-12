import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TripInfo from './TripInfo';
import TripGroup from './TripGroup';
import { selectTrips } from '../../../actions';


// We use the gql tag to parse our query string into a query document
const query = gql`{
  allUsers {
    id,
    username
  }
}
`;

class MyTrip extends React.Component {
  // componentDidMount(props) {
  //   // selectTrips(props.data.allUsers);
  //   console.log('query', props);
  // }

  render() {
    console.log('bye', this.props);
    const { data } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/homepage/mytrip/tripinfo" component={TripInfo} />
          <Route path="/homepage/mytrip/tripgroup" component={TripGroup} />
        </Switch>
      </div>
    );
  }
}


export default graphql(query)(MyTrip);

// mytrip component and add trending trip component routing to trip info
