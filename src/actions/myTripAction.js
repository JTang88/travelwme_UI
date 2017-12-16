function myTrip(tripid) {
  console.log('ACTIONNNN-2');
  return {
    type: 'MY_TRIP',
    payload: tripid,
  };
}

export default myTrip;

