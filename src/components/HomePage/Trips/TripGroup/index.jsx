import React from 'react';
import { connect } from 'react-redux';

function TripGroup(props) {
  console.log('TRIPGROUP', props.users);
  return (
    <div>
      <h1>Trip Group</h1>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(TripGroup);
