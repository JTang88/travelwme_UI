import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../TripList';
import searchTrips from '../../../../graphql/queries/searchTrips';
import { getCurrentSearchTerms } from '../../../../graphql/queries/getCurrentSearchTerms';

const FoundTrips = (props) => {
  return (
    <div>
      <div>Trips we found for you</div>
      { 
        props.searchTripsQuery.loading ? '' : 
        <TripList 
          trips={props.searchTripsQuery.searchTrips} 
          from={props.location.pathname}
          {...props}
        /> 
      }
    </div>
  );
};

const WrapedFoundTrips = compose(
  graphql(getCurrentSearchTerms, {
    name: 'getCurrentSearchTermsQuery',
  }),
  graphql(searchTrips, {
    name: 'searchTripsQuery',
    options: props => ({ variables: { ...props.getCurrentSearchTermsQuery.getCurrentSearchTerms } }),
  }),
)(FoundTrips);

export default WrapedFoundTrips;
