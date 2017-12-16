export default function (state = null, action) {
  switch (action.type) {
    case 'MY_TRIP':
      return action.payload;
  }
  return state;
}
