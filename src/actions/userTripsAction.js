function userTrips(trips) {
  console.log('ACTIONNNN');
  return {
    type: 'USER_TRIPS',
    payload: trips,
  };
}

export default userTrips;

