import React from 'react';
import { graphql } from 'react-apollo';
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

class TrendTrips extends React.Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {
    setTimeout(() => (console.log(this.props.data)), 2000)
    // console.log('this is my data from graphql!!!! ', this.props.data)
  }

  render() {
    return (
      <div>
        <h1>Trending Trips</h1>
      </div>
    );
  }
}

// make query request to graphQL server fro top 10 newest trips trips
// make quesy request to graphQl server for current user info
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

const TrendTripsWithQuery = graphql(getUser, {
  options: props => ({
    variables: {
      id: props.auth.user.id,
    },
  }),
})(TrendTrips);

export default connect(mapStateToProps)(TrendTripsWithQuery);


// const TrendTripsWithQuery = graphql(getUser, { options: { variables: { id: 1 } } })(TrendTrips);
// const TrendTripsWithQuery = graphql(getUser, { options: { variables: { id: TrendTrips.props.auth.user.id } } })(TrendTrips);
// MyTrips = graphql(queryTrips, { options: props => ({ variables: { id: props.userid, }, }),})(MyTrips);
