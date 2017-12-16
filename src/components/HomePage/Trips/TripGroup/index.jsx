import React from 'react';
import { connect } from 'react-redux';
import Travelers from '../TripGroup/Travelers';
import TripDetails from '../TripInfo/TripDetails';

function TripGroup(props) {
  return (
    <div>
      <h1>Trip Group</h1>
      <Travelers />
      <TripDetails />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    // users: state.users,
  };
}

export default connect(mapStateToProps)(TripGroup);
