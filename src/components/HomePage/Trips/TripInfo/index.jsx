import React from 'react';
import { connect } from 'react-redux';
import TripDetails from './TripDetails';
import TripUsers from './TripUsers';

function TripInfo(props) {
  return (
    <div>
      <TripDetails />
      <TripUsers />
      <button onClick={() => console.log(props)}>
              button
        </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    mytrip: state.mytrip,
  };
}

export default connect(mapStateToProps)(TripInfo);
