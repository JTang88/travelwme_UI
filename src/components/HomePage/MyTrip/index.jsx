import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TripInfo from './TripInfo';
import TripGroup from './TripGroup';


// We use the gql tag to parse our query string into a query document
const query = gql`{
  allUsers {
    id,
    username
  }
}
`;

function MyTrip(props) {
  console.log('query', props);
  return (
    <div>
      <Switch>
        <Route path="/homepage/mytrip/tripinfo" component={TripInfo} />
        <Route path="/homepage/mytrip/tripgroup" component={TripGroup} />
      </Switch>
    </div>
  );
}


export default graphql(query)(MyTrip);

// mytrip component and add trending trip component routing to trip info
