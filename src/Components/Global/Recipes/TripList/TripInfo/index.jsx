import React, { Component } from 'react';
import { merge } from 'lodash';
import { graphql, compose } from 'react-apollo';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';
import getTrip from '../../../../../graphql/queries/getTrip';
import getCurrentTrip from '../../../../../graphql/queries/getCurrentTrip';

class TripInfo extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div>
        { !this.props.getTripQuery.loading ? 
          <TripDetails 
            trip={
              merge(
              {},
              this.props.getCurrentTripQuery.getCurrentTrip, 
              this.props.getTripQuery.getTrip
              )
            }
          /> : '' 
        }
        <div className="trippic">
          { !this.props.getTripQuery.loading ? 
            <TripUsers 
              members={this.props.getTripQuery.getTrip.members} 
            /> : ''
          } 
        </div>
      </div>
    );
  }
}

const WrapedTripInfo = compose(
  graphql(getTrip, {
    name: 'getTripQuery',
    options: props => (
      { variables: { id: Number(props.match.params.id) } }
    ), 
  }),
  graphql(getCurrentTrip, {
    name: 'getCurrentTripQuery',
  }),
)(TripInfo);

export default WrapedTripInfo;

