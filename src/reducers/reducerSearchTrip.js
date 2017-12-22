export default function (state = [], action) {
  console.log('inside searchtrip reducer', action.type)
  switch (action.type) {
    case 'SEARCH_TRIP':
      return action.payload;
  }
  return state;
}
