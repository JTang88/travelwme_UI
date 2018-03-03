import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';
import getTrip from '../../../../../graphql/queries/getTrip';

class TripInfo extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div>
        { !this.props.data.loading ? <TripDetails trip={this.props.data.getTrip} /> : '' }
        <div className="trippic">
          { !this.props.data.loading ? <TripUsers members={this.props.data.getTrip.members} /> : ''} 
        </div>
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

