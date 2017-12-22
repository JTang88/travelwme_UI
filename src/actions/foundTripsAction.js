function foundTrips(tripObj) {
  return {
    type: 'FOUND_TRIP',
    payload: tripObj,
  };
}

export default foundTrips;
