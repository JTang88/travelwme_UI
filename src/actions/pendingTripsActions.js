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


// for (let i = 0; i < trips.length; i++) {
//     for (let j = 0; j < trips[i].users.length; j++) {
//       if (trips[i].users[j].user_type === 'I') {
//         pendtrips.push(trips[i]);
//       }
//     }
//   }

