import React, { Component } from 'react';
import { graphql } from 'react-apollo';
// import TripDetails from './TripDetails';
// import TripUsers from './TripUsers';
import getTrip from '../../../../graphql/queries/getTrip';

class TripInfo extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.match.params.id}
        {/* <TripDetails />
        <div className="trippic">
          <TripUsers />
        </div> */}
      </div>
    );
  }
}

const WrapedTripInfo = graphql(getTrip, {
  options: props => (
    { variables: { id: Number(props.match.params.id) } }
  ), 
})(TripInfo);

export default WrapedTripInfo;

