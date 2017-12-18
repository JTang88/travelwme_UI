import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const getUser = gql`
query getUser($id: Int!) {
  getUser(id: $id) {
    username
    age
    body_type
    relationship
  }
}`;

const allTrips = gql`
query allTrips {
  allTrips {
    title
    id
  }
}`;

// const allUsers = gql`
// query allUsers {
//   allUsers {
//     username
//     id
//   }
// }`;

class TrendTrips extends React.Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {
    setTimeout(() => (console.log('this is user datea' , this.props.getUser)), 2000);
    setTimeout(() => (console.log('this is trip data' , this.props.allTrips)), 3000);
  }

  render() {
    return (
      <div>
        <h1>Trending Trips</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}


const Container = compose(
  graphql(
    getUser, 
    { 
      name: 'getUser',
      options: props => ({
        variables: {
          id: props.auth.user.id,
        },
      }),
    },
  ),
  graphql(allTrips, { name: 'allTrips' })
)(TrendTrips);

 export default connect(mapStateToProps)(Container);

 // ==================================================


 // const Container = compose(
//   graphql(getUser, { name: 'getUser',
//   options: props => ({
//     variables: {
//       id: props.auth.user.id,
//     },
//   }),
//   }),
//   graphql(allUsers, { name: 'allUsers', })
// )(TrendTrips)

// const TrendTripsWithQuery = graphql(getUser, {
//   options: props => ({
//     variables: {
//       id: props.auth.user.id,
//     },
//   }),
// })(TrendTrips);

// const TrendTripsWithUserData = graphql(getUser, {
//   options: props => ({
//     variables: {
//       id: props.auth.user.id,
//     },
//   props: ({ data }) => ({
//     user: data,
//   }),
//   }),
// })(TrendTrips);


// const TrendTripsWithTripData = graphql(allTrips, {
//   props: ({ data }) => ({
//     trips: data,
//   }),
// });

// export default compose(
//   connect(mapStateToProps),
//   graphql(query, config)
// )(PeopleContainer);

// const Container = compose(
//   graphql(EntitiesQuery, { name: 'EntitiesQuery' }),
//   graphql(MeQuery, { name: 'MeQuery' }),
// )(Component)

// const CompleteTrendTrip = compose(
//   TrendTripsWithUserData,
//   TrendTripsWithTripData,
// )(TrendTrips);

// console.log('this is completeTrendTRrip=======' ,CompleteTrendTrip)

// export default connect(mapStateToProps)(CompleteTrendTrip);

// export default connect(mapStateToProps)(CompleteTrendTrip);

// ========================================================


// import React from 'react';
// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';



// const getUser = gql`
// query getUser($id: Int!) {
//   getUser(id: $id) {
//     username
//     age
//     body_type
//     relationship
//   }
// }`;

// class TrendTrips extends React.Component {
//   constructor(props) {
//     super(props);


//   }

//   componentDidMount() {
//     setTimeout(() => (console.log(this.props.data)), 2000)
//     // console.log('this is my data from graphql!!!! ', this.props.data)
//   }

//   render() {
//     return (
//       <div>
//         <h1>Trending Trips</h1>
//       </div>
//     );
//   }
// }

// // make query request to graphQL server fro top 10 newest trips trips
// // make quesy request to graphQl server for current user info
// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }

// const TrendTripsWithQuery = graphql(getUser, {
//   options: props => ({
//     variables: {
//       id: props.auth.user.id,
//     },
//   }),
// })(TrendTrips);


// export default connect(mapStateToProps)(TrendTripsWithQuery);

