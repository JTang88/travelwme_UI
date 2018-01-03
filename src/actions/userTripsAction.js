function userTrips(trips) {
  let mytrips = [];
  console.log('TRIP ACTIONNNN', trips);
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].user_type === 'C' || trips[i].user_type === 'J') {
      mytrips.push(trips[i]);
    }
  }
  return {
    type: 'USER_TRIPS',
    payload: mytrips,
  };
}

export default userTrips;

