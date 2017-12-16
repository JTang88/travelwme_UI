export default function (state = [], action) {
  switch (action.type) {
    case 'ALL_TRIPS':
      return action.payload;
  }
  return state;
}
