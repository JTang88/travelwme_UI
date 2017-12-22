export default function (state = {}, action) {
  switch (action.type) {
    case 'FOUND_TRIP':
      return action.payload;
  }
  return state;
}
