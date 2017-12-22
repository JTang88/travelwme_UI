export default function (state = [], action) {
  console.log('reducer status', action);
  let allTrips = [];
  let tripObj;
  if (action.type === 'TRIP_STATUS') {
    for (let i = 0; i < action.payload.trips.length; i++) {
      if (action.payload.id !== action.payload.trips[i].id) {
        allTrips = [...allTrips, { ...action.payload.trips[i] }];
      }
      if (action.payload.id === action.payload.trips[i].id) {
        tripObj = { ...action.payload.trips[i] };
        tripObj.trip_status = action.payload.status;
        allTrips = [...allTrips, { ...tripObj }];
      }
    }
    console.log('updated!!!!!!!!!!!!! ', allTrips);
  }
  switch (action.type) {
    case 'USER_TRIPS':
      return action.payload;
    case 'TRIP_STATUS':
      return allTrips;  
  }
  return state;
}
