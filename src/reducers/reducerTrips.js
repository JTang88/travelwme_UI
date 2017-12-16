export default function (state = [], action) {
  console.log('REDDDDDD', action);
  switch (action.type) {
    case 'ALL_TRIPS':
      return action.payload;
  }
  return state;
}
