import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../TripList';
import TripListHeader from '../../TripListHeader';
import CountTripsAndForSureGoings from '../../../../services/CountTripsAndForSureGoings';
import searchTrips from '../../../../graphql/queries/searchTrips';
import { getCurrentSearchTerms } from '../../../../graphql/queries/getCurrentSearchTerms';


const FoundTrips = ({
  searchTripsQuery: {
    loading,
    searchTrips,
  },
  location: {
    pathname,
  },
}) => {
  console.log('did it render foundTrip already?')
  return loading ? '' : (
    <div>
      <TripListHeader
        title="Trips You are for Sure Going"
      >
        {
          `• We have found ${CountTripsAndForSureGoings(searchTrips).tripsCount} 
          trips that matched your criteria
          • ${CountTripsAndForSureGoings(searchTrips).forSureGoings} 
          total for sure going travelers`
        }
      </TripListHeader>
      <TripList
        trips={searchTrips}
        from={pathname}
      />
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

// import React from 'react';
// import { graphql, compose } from 'react-apollo';
// import TripList from '../../TripList';
// import searchTrips from '../../../../graphql/queries/searchTrips';
// import { getCurrentSearchTerms } from '../../../../graphql/queries/getCurrentSearchTerms';

// const FoundTrips = (props) => {
//   return (
//     <div>
//       <div>Trips we found for you</div>
//       { 
//         props.searchTripsQuery.loading ? '' : 
//         <TripList 
//           trips={props.searchTripsQuery.searchTrips} 
//           from={props.location.pathname}
//           {...props}
//         /> 
//       }
//     </div>
//   );
// };

// const WrapedFoundTrips = compose(
//   graphql(getCurrentSearchTerms, {
//     name: 'getCurrentSearchTermsQuery',
//   }),
//   graphql(searchTrips, {
//     name: 'searchTripsQuery',
//     options: props => ({ variables: { ...props.getCurrentSearchTermsQuery.getCurrentSearchTerms } }),
//   }),
// )(FoundTrips);

// export default WrapedFoundTrips;
