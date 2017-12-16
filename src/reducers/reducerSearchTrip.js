export default function (state = null, action) {
  switch (action.type) {
    case 'SEARCH_TRIP':
      return action.payload;
  }
  return state;
}