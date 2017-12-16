export default function (state = null, action) {
  switch (action.type) {
    case 'ALL_TRIPS':
      return action.payload;
  }
  return state;
}
