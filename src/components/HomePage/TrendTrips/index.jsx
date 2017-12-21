import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentUser } from '../../../actions/authActions';
import setTrendTrips from '../../../actions/trendTripAction';
import showTrip from '../../../actions/showTripAction';
import tripCreator from '../../../actions/tripCreatorAction';
import tripTravelers from '../../../actions/tripTravelersAction';
import tripInterested from '../../../actions/tripInterestedAction';
import updateStatus from '../../../actions/tripStatusAction';

const getUser = gql`
query getUser($id: Int!) {
  getUser(id: $id) {
    id
    username
    age
    gender
    body_type
    relationship
    description
    publicId
  }
}`;

const allTrips = gql`
query allTrips {
  allTrips {
    id
    title
    description
    date_start
    date_end
    gender
    age
    relationship
    cost
    trip_status
    users{
      id
      username
      user_type
      gender
      age
    }
  }
}`;


class TrendTrips extends React.Component { 
  constructor(props) {
    super(props);
    // this.checkOutATrip = this.checkOutATrip.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.qlUser.getUser && !prevProps.qlUser.getUser) {
      console.log('setting current user with graphql stuff');
      this.props.setCurrentUser(this.props.qlUser.getUser);
    }

    if (this.props.qlTrips.allTrips && !prevProps.qlTrips.allTrips) {
      console.log('setting current user with graphql stuff');
      this.props.setTrendTrips(this.props.qlTrips.allTrips);
    }

  }

  setTripAndTravelers(trip) {
    this.props.showTrip(trip);
    this.props.tripCreator(trip.users);
    this.props.tripTravelers(trip.users);
    this.props.tripInterested(trip.users);
    this.props.updateStatus(trip.trip_status);
  }

  render() {
    console.log('TRENDTRIPPPP', this.props);
    return (
      <div>
        <h1>Trending Trips</h1>
        {
          this.props.trend.trips.map((trip, i) => (
            <div key={i} >
              <h3 onClick={() => this.setTripAndTravelers(trip)}>
                <Link to="homepage/trips/tripinfo" href="homepage/trips/tripinfo">{trip.title}</Link>
              </h3>
            </div>  
            )
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    trend: state.trend,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentUser, setTrendTrips, showTrip, tripCreator, tripTravelers, tripInterested, updateStatus,
  }, dispatch);
}

const Container = compose(
  graphql(
    getUser, 
    { 
      name: 'qlUser',
      options: (props) => {
        console.log('creating container component. props.auth.getUser.id = ', props.auth.user.id);
        return {
          variables: {
            id: props.auth.user.id,
          },
        }
      },
    },
  ),
  graphql(allTrips, { name: 'qlTrips' })
)(TrendTrips);

export default connect(mapStateToProps, matchDispatchToProps)(Container);


// export default async () => {

//   function mapStateToProps(state) {
//     return {
//       auth: state.auth,
//     };
//   }
  
//   function matchDispatchToProps(dispatch) {
//     return bindActionCreators({ setCurrentUser }, dispatch);
//   }
  
//   const Container = await compose(
//     graphql(
//       getUser, 
//       { 
//         name: 'getUser',
//         options: props => ({
//           variables: {
//             id: props.auth.user.id,
//           },
//         }),
//       },
//     ),
//     graphql(allTrips, { name: 'allTrips' })
//   )(TrendTrips);

//   return connect(mapStateToProps, matchDispatchToProps)(Container);
// }();




// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({ setCurrentUser }, dispatch);
// }

// const Container = compose(
//   graphql(
//     getUser, 
//     { 
//       name: 'getUser',
//       options: props => ({
//         variables: {
//           id: props.auth.user.id,
//         },
//       }),
//     },
//   ),
//   graphql(allTrips, { name: 'allTrips' })
// )(TrendTrips);

// export default connect(mapStateToProps/*, matchDispatchToProps*/)(Container);





 

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

