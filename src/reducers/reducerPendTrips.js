export default function (state = [], action) {
  switch (action.type) {
    case 'PEND_TRIPS':
      return action.payload;
  }
  return state;
}
