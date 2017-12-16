function myTrip(tripid) {
  return {
    type: 'MY_TRIP',
    payload: tripid,
  };
}

export default myTrip;

