export default function (state = null, action) {
  switch (action.type) {
    case 'SHOW_TRIP':
      return action.payload;
  }
  return state;
}
