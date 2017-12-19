export default function (state = null, action) {
  switch (action.type) {
    case 'TRIP_STATUS':
      return action.payload;
  }
  return state;
}
