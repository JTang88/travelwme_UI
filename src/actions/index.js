function selectTrips(trips) {
  return {
    type: 'ALL_TRIPS',
    payload: trips,
  };
}

export default selectTrips;

