export default function (state = null, action) {

  switch (action.type) {
    case 'SINGLE_STATUS':
      return action.payload;
  }
  return state;
}
// action.payload.trips[i] = Object.defineProperties(action.payload.trips[i], {'trip_status': {writable: true}})
// console.log('111111', action.payload.trips[i].trip_status);
// console.log('22222222', action.payload.status);
// action.payload.trips[i].trip_status = action.payload.status;
// console.log('3333333', action.payload);