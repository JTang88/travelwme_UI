import React from 'react';
import { connect } from 'react-redux';

function TripDetails(props) {
  return (
    <div>
      <h4>Trip Details</h4>
      <h4>Title: {props.showtrip.title}</h4>
      <h4>Description: {props.showtrip.description}</h4>
      <h4>Start Date: {props.showtrip.date_start}</h4>
      <h4>End Date: {props.showtrip.date_end}</h4>
      <h4>Relationship: {props.showtrip.relationship}</h4>
      <h4>Trip Status: { props.singlestat === null ? props.showtrip.trip_status : props.singlestat}</h4>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    trips: state.trips,
    showtrip: state.showtrip,
    singlestat: state.singlestat,
  };
}

export default connect(mapStateToProps)(TripDetails);
