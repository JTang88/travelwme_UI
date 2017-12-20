function pendTrips(trips) {
  const pendtrips = [];
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].user_type === 'I') {
      pendtrips.push(trips[i]);
    }
  }
  return {
    type: 'PEND_TRIPS',
    payload: pendtrips,
  };
}

export default pendTrips;

