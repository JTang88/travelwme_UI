import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../Global/Recipes/TripList';
import searchTrips from '../../../../graphql/queries/searchTrips';
import { getCurrentSearchTerms } from '../../../../graphql/queries/getCurrentSearchTerms';

const FoundTrips = (props) => {
  console.log('this is props in FoundTrips', props);
  // console.log('this is obj desc of search term', {...props.getCurrentSearchTermsQuery.getCurrentSearchTerms})
  return (
    <div>
      <div>Trips we found for you</div>
      { props.data.loading ? '' : <TripList trips={props.data.searchTrips} /> }
    </div>
  );
};

const WrapedFoundTrips = 
  graphql(searchTrips, {
    options: (props) => { 
      return { 
        variables: { 
          userId: 201,
          cost_start: 1000,
          cost_end: 40000,
          date_start: '04-05-2018',
          date_end: '09-10-2018',
          keys: 'test',
        }, 
      };
    },
  })(FoundTrips);

export default WrapedFoundTrips;


// const WrapedFoundTrips = compose(
//   graphql(getCurrentSearchTerms, {
//     name: 'getCurrentSearchTermsQuery',
//   }),
//   graphql(searchTrips, {
//     name: 'searchTripsQuery',
//     options: (props) => { 
//       return { 
//         variables: { 
//           userId: 201,
//           cost_start: 1000,
//           cost_end: 40000,
//           date_start: '04-05-2018',
//           date_end: '09-10-2018',
//           keys: JSON.stringify(["Adventurer"]),
//         }, 
//       };
//     },
//   }),
// )(FoundTrips);

// export default WrapedFoundTrips;

// const WrapedFoundTrips = compose(
//   graphql(getCurrentSearchTerms, {
//     name: 'getCurrentSearchTermsQuery',
//   }),
//   graphql(searchTrips, {
//     name: 'searchTripsQuery',
//     options: (props) => { 
//       const { userId, cost_start, cost_end, date_start, date_end, keys } = props.getCurrentSearchTermsQuery.getCurrentSearchTerms;
//       return { variables: { userId, cost_start, cost_end, date_start, date_end, keys } };
//     },
//   }),
// )(FoundTrips);

// export default WrapedFoundTrips;