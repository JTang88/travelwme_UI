export default function (state = null, action) {
  console.log('mytrip', action);
  switch (action.type) {
    case 'MY_TRIP':
      return action.payload;
  }
  return state;
}
