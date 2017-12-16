export default function (state = [], action) {
  switch (action.type) {
    case 'USER_TRIPS':
      return action.payload;
  }
  return state;
}
