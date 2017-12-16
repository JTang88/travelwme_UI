import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import { connect } from 'react-redux';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';


class TripInfo extends React.Component {
  onClick() {
    this.props.mutate({
      variables: { userId: 1, tripId: 3, user_type: "interested" }
    })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    console.log('TRIPINFOOOOO', this.props)
    return (
      <div>
      <TripDetails />
      <TripUsers />
      <button onClick={this.onClick.bind(this)}>Mutate</button>
      </div>
    )
  }; 
}

const interestedInATrip = gql`
mutation interestedInATrip($userId: Int!, $tripId: Int!, $user_type: String!) {
    interestedInATrip(userId: $userId, tripId: $tripId, user_type: $user_type) {
      id
  }
}
`;

//searchtripid in redux to allow join button
// let join;
// if (props.search) {
  //   join = (
    //     <button>Ask to join!</button>
    //   );
    // }
//     function mapStateToProps(state) {
//       return {
//         trips: state.trips,
//     mytrip: state.mytrip,
//     search: state.search,
//   };
// }
// connect(mapStateToProps)

TripInfo = graphql(interestedInATrip)(TripInfo);

export default (TripInfo);
